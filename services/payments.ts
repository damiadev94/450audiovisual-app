import { createClient } from '@/lib/supabase/server'
import { extendMembership } from './membership'

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
  const supabase = await createClient()

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
