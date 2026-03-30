import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { processApprovedPayment } from '@/services/payments'

// Configuración de MercadoPago con el Access Token de las variables de entorno
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' 
})

/**
 * WEBHOOK DE MERCADOPAGO
 * 
 * Este endpoint recibe notificaciones automáticas de MercadoPago cada vez que 
 * ocurre un evento en un pago (aprobación, rechazo, etc.).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, data } = body

    // 1. Validar que sea una notificación de pago
    if (body.type === 'payment' || action === 'payment.created' || action === 'payment.updated') {
      const paymentId = data.id
      const paymentClient = new Payment(client)

      // 2. Obtener los detalles del pago desde la API de MercadoPago
      const payment = await paymentClient.get({ id: paymentId })

      // 3. Si el pago fue aprobado, procesamos la lógica de negocio
      if (payment.status === 'approved') {
        // En un flujo real, 'external_reference' debería contener el ID del usuario
        // que pasamos al crear la preferencia de pago.
        const userId = payment.external_reference
        
        if (!userId) {
          console.error('Pago aprobado sin external_reference (userId):', paymentId)
          return NextResponse.json({ error: 'Falta userId' }, { status: 400 })
        }

        await processApprovedPayment({
          userId: userId,
          externalId: payment.id?.toString() || paymentId.toString(),
          amount: payment.transaction_amount || 0,
          status: 'approved',
          paymentMethod: payment.payment_method_id
        })

        console.log(`Pago ${paymentId} procesado con éxito para el usuario ${userId}`)
      }
    }

    // MercadoPago espera un 200/201 para confirmar la recepción
    return NextResponse.json({ received: true }, { status: 200 })

  } catch (error) {
    console.error('Error en Webhook de MercadoPago:', error)
    // Retornamos 200 de todas formas para evitar que MP reintente infinitamente si es un error de lógica
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 200 })
  }
}
