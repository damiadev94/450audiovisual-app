import { createClient } from '@/lib/supabase/server'
import { extendMembership } from './membership'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase/supabase'
import client from '@/lib/mercadopago/mercadopago';
import { Preference, PreApproval } from 'mercadopago';

/**
 * SERVICIO DE PAGOS
 * 
 * Maneja la creación de registros de pago y la activación de beneficios asociados.
 */

interface PaymentData {
  userId: string
  externalId: string
  amount: number
  status: string
  paymentMethod?: string
}

/**
 * Procesa un pago aprobado:
 * 1. Registra el pago en la tabla 'payments' (evitando duplicados por external_id).
 * 2. Extiende la membresía del usuario.
 * 3. Genera un ticket para el sorteo activo.
 */
export async function processApprovedPayment(data: PaymentData) {
  const supabase: SupabaseClient<Database> = await createClient()

  // 1. Registrar pago (idempotencia manejada por el UNIQUE en external_id en la DB)
  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .insert({
      user_id: data.userId,
      external_id: data.externalId,
      amount: data.amount,
      status: data.status,
      payment_method: data.paymentMethod
    })
    .select()
    .single()

  if (paymentError) {
    // Si el error es por duplicado, es un evento que ya procesamos.
    if (paymentError.code === '23505') {
      console.log(`Pago ${data.externalId} ya procesado anteriormente.`)
      return
    }
    throw paymentError
  }

  // 2. Extender membresía
  await extendMembership(data.userId)

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

    await supabase.from('tickets').insert({
      user_id: data.userId,
      raffle_id: raffle.id,
      payment_id: payment.id,
      ticket_number: ticketNumber
    })
  }

  return payment
}

// 4. Preferencia de Pago
export async function createPaymentPreference(items: any[]) {
  const preference = new Preference(client);
  const response = await preference.create({
    body: {
      items,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending`
      }
    }
  });

  return response.id;
}

// 5. Suscripción Mensual (Preapproval)
export async function createSubscription(userId: string, userEmail: string) {
  const preApproval = new PreApproval(client);
  const response = await preApproval.create({
    body: {
      reason: "Bunker 450 Pro - Suscripción Mensual",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 9999,
        currency_id: "ARS"
      },
      back_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
      payer_email: userEmail,
      external_reference: userId,
      status: "pending"
    }
  });

  // init_point is the URL where the user should be redirected to pay
  return response.init_point;
}
