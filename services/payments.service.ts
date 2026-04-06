import { SupabaseClient } from '@supabase/supabase-js'
import { Database, Json } from '@/types/supabase'
import { MembershipsService } from './memberships.service'
import { logger } from '@/lib/utils/logger'
import client from '@/lib/mercadopago/client'
import { Preference, PreApproval } from 'mercadopago'

/**
 * SERVICIO DE PAGOS
 * 
 * Maneja la creación de registros de pago y la activación de beneficios asociados.
 * Las funciones de procesamiento reciben SupabaseClient como parámetro para
 * permitir inyección del admin client (webhooks) o session client (páginas).
 */

interface PaymentData {
  userId: string
  externalId: string
  amount: number
  status: string
  paymentMethod?: string
  rawResponse?: Record<string, unknown>
  paymentId: string
}

type PaymentInsert = Database['public']['Tables']['payments']['Insert'];

/**
 * Procesa un pago aprobado:
 * 1. Registra el pago en la tabla 'payments' (evitando duplicados por external_id).
 * 2. Extiende la membresía del usuario.
 * 3. Genera un ticket para el sorteo activo.
 */
export async function processApprovedPayment(
  supabase: SupabaseClient<Database>,
  data: PaymentData
) {
  // 1. Registrar pago (idempotencia manejada por el UNIQUE en external_id en la DB)
  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .insert({
      user_id: data.userId,
      external_id: data.externalId,
      amount: data.amount,
      mp_status: data.status,
      payment_method: data.paymentMethod,
      raw_response: (data.rawResponse as Json) ?? null,
      mp_payment_id: data.paymentId, // Asegúrate de que 'data' tenga este valor
      payment_type: 'subscription',
    } as PaymentInsert)
    .select()
    .single()

  if (paymentError) {
    // Si el error es por duplicado (UNIQUE violation), es un evento ya procesado.
    if (paymentError.code === '23505') {
      logger.info('payment.duplicate_skipped', {
        externalId: data.externalId,
        userId: data.userId,
      })
      return null
    }
    logger.error('payment.insert_failed', {
      externalId: data.externalId,
      userId: data.userId,
      error: paymentError.message,
    })
    throw paymentError
  }

  logger.info('payment.recorded', {
    paymentId: payment.id,
    externalId: data.externalId,
    userId: data.userId,
    amount: data.amount,
  })

  // 2. Extender membresía
  const membershipsService = new MembershipsService(supabase)
  await membershipsService.extendMembership(data.userId)

  // 3. Generar Ticket de Sorteo
  // Buscamos el sorteo activo más reciente
  const { data: raffle } = await supabase
    .from('raffles')
    .select('id')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (raffle) {
    const ticketNumber = `B450-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    const { error: ticketError } = await supabase.from('tickets').insert({
      user_id: data.userId,
      raffle_id: raffle.id,
      payment_id: payment.id,
      ticket_number: ticketNumber,
    })

    if (ticketError) {
      // No lanzar error — el ticket es un beneficio secundario, no debe bloquear el pago
      logger.warn('ticket.insert_failed', {
        userId: data.userId,
        raffleId: raffle.id,
        error: ticketError.message,
      })
    } else {
      logger.info('ticket.generated', {
        userId: data.userId,
        ticketNumber,
        raffleId: raffle.id,
      })
    }
  }

  return payment
}

// 4. Preferencia de Pago (checkout único)
export async function createPaymentPreference(items: {
  id: string
  title: string
  quantity: number
  unit_price: number
  currency_id?: string
}[]) {
  const preference = new Preference(client)
  const response = await preference.create({
    body: {
      items,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending`,
      },
    },
  })

  return response.id
}

// 5. Suscripción Mensual (Preapproval)
export async function createSubscription(userId: string, userEmail: string) {
  const preApproval = new PreApproval(client)
  const response = await preApproval.create({
    body: {
      reason: 'Bunker 450 Pro - Suscripción Mensual',
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: 9999,
        currency_id: 'ARS',
      },
      back_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
      payer_email: userEmail,
      external_reference: userId,
      status: 'pending',
    },
  })

  // init_point is the URL where the user should be redirected to pay
  return response.init_point
}
