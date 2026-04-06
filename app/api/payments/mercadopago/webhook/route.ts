import { NextResponse } from 'next/server'
import { Payment, PreApproval } from 'mercadopago'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyWebhookSignature } from '@/lib/mercadopago/service'
import { processApprovedPayment } from '@/services/payments.service'
import { handleSubscriptionUpdate } from '@/services/subscriptions.service'
import { logger } from '@/lib/utils/logger'
import client from '@/lib/mercadopago/client'
import { MPWebhookSchema } from '@/lib/validation/mpwebhook.schema'

/* *
 * WEBHOOK DE MERCADOPAGO
 * 
 * Endpoint que recibe notificaciones automáticas de MercadoPago.
 * 
 * Flujo seguro:
 * 1. Verificar firma x-signature (HMAC SHA-256)
 * 2. Identificar tipo de evento (payment / subscription)
 * 3. Consultar API de MercadoPago para obtener datos reales
 * 4. Procesar según tipo (idempotente via UNIQUE external_id)
 * 5. Retornar 200 siempre (evitar reintentos infinitos)
 */
export async function POST(request: Request) {
  try {

    const parsed = MPWebhookSchema.safeParse(await request.json());

    if (!parsed.success) {
      logger.warn("invalid.webhook.payload", {
        issues: parsed.error.issues,
      });
      // ! IMPORTANTE:
      // * Respondemos 200 para evitar retries infinitos
      return NextResponse.json({ received: true });
    }

    const body = parsed.data;
    const { action, data, type } = body

    // * 1. Verificar firma del webhook
    const xSignature = request.headers.get('x-signature')
    const xRequestId = request.headers.get('x-request-id')
    const dataId = data?.id?.toString() || ''

    if (!verifyWebhookSignature({ xSignature, xRequestId, dataId })) {
      logger.warn('webhook.signature_invalid', {
        action,
        type,
        dataId,
        hasSignature: !!xSignature,
        hasRequestId: !!xRequestId,
      })
      return NextResponse.json({ error: 'Firma inválida' }, { status: 403 })
    }

    // * Cliente admin (bypasa RLS, no necesita cookies de sesión)
    const supabase = createAdminClient()

    // * 2. Procesar según tipo de evento
    if (type === 'payment' || action === 'payment.created' || action === 'payment.updated') {
      await handlePaymentEvent(data.id, supabase)
    } else if (type === 'subscription_preapproval' || action === 'subscription_preapproval.updated') {
      await handleSubscriptionEvent(data.id, supabase)
    } else {
      logger.info('webhook.unhandled_type', { type, action })
    }

    // * MercadoPago espera un 200/201 para confirmar la recepción
    return NextResponse.json({ received: true }, { status: 200 })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    logger.error('webhook.unhandled_error', { error: message })

    // * Retornamos 200 para evitar que MP reintente infinitamente por errores de lógica
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 200 })
  }
}

/* *
 * Procesa un evento de pago:
 * - Consulta la API de MercadoPago para obtener el estado real
 * - Solo procesa pagos aprobados
 * - Idempotente via UNIQUE external_id en la tabla payments
 */
async function handlePaymentEvent(
  paymentId: string | number,
  supabase: ReturnType<typeof createAdminClient>
) {
  const paymentClient = new Payment(client)

  // * Consultar API de MercadoPago directamente (nunca confiar solo en el payload del webhook)
  const payment = await paymentClient.get({ id: Number(paymentId) })

  logger.info('webhook.payment_received', {
    paymentId: payment.id,
    status: payment.status,
    externalReference: payment.external_reference,
    amount: payment.transaction_amount,
  })

  // * Solo procesamos pagos aprobados
  if (payment.status !== 'approved') {
    logger.info('webhook.payment_not_approved', {
      paymentId: payment.id,
      status: payment.status,
    })
    return
  }

  const userId = payment.external_reference
  if (!userId) {
    logger.error('webhook.payment_no_user', {
      paymentId: payment.id,
      status: payment.status,
    })
    return
  }

  await processApprovedPayment(supabase, {
    userId,
    externalId: payment.id?.toString() || paymentId.toString(),
    amount: payment.transaction_amount || 0,
    status: 'approved',
    paymentMethod: payment.payment_method_id ?? undefined,
    rawResponse: payment as unknown as Record<string, unknown>,
    paymentId: payment.id?.toString() || paymentId.toString(),
  })

  logger.info('webhook.payment_processed', {
    paymentId: payment.id,
    userId,
  })
}

/* *
 * Procesa un evento de suscripción (preapproval):
 * - Consulta la API de MercadoPago para obtener el estado real
 * - Sincroniza el estado de la suscripción en la base de datos
 */
async function handleSubscriptionEvent(
  preapprovalId: string | number,
  supabase: ReturnType<typeof createAdminClient>
) {
  const preApprovalClient = new PreApproval(client)

  // * Consultar API de MercadoPago para estado real
  const preApproval = await preApprovalClient.get({ id: preapprovalId.toString() })

  logger.info('webhook.subscription_received', {
    preapprovalId: preApproval.id,
    status: preApproval.status,
    externalReference: preApproval.external_reference,
  })

  const userId = preApproval.external_reference
  if (!userId) {
    logger.error('webhook.subscription_no_user', { preapprovalId: preApproval.id })
    return
  }

  await handleSubscriptionUpdate(supabase, {
    externalSubscriptionId: preApproval.id?.toString() || preapprovalId.toString(),
    userId,
    status: preApproval.status as 'authorized' | 'paused' | 'cancelled' | 'pending',
  })

  logger.info('webhook.subscription_processed', {
    preapprovalId: preApproval.id,
    userId,
    status: preApproval.status,
  })
}
