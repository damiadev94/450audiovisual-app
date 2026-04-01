import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'
import { logger } from '@/lib/utils/logger'

/**
 * SERVICIO DE SUSCRIPCIONES
 * 
 * Maneja eventos de preapproval (suscripción recurrente) de MercadoPago:
 * - Creación de suscripciones
 * - Cambios de estado (activa, pausada, cancelada)
 * - Sincronización con membership_status del perfil
 */

interface SubscriptionEventData {
  externalSubscriptionId: string
  userId: string
  status: 'authorized' | 'paused' | 'cancelled' | 'pending'
  dateCreated?: string
}

/**
 * Procesa un cambio de estado en la suscripción recurrente.
 * Actualiza la tabla subscriptions y sincroniza el membership_status del perfil.
 */
export async function handleSubscriptionUpdate(
  supabase: SupabaseClient<Database>,
  data: SubscriptionEventData
) {
  // Mapear estados de MP a estados internos
  const statusMap: Record<string, 'active' | 'inactive' | 'cancelled'> = {
    authorized: 'active',
    paused: 'inactive',
    cancelled: 'cancelled',
    pending: 'inactive',
  }

  const internalStatus = statusMap[data.status] || 'inactive'

  // 1. Buscar o crear la suscripción
  const { data: existingSub } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('external_subscription_id', data.externalSubscriptionId)
    .single()

  if (existingSub) {
    // Actualizar estado de suscripción existente
    const { error } = await supabase
      .from('subscriptions')
      .update({ status: internalStatus })
      .eq('id', existingSub.id)

    if (error) {
      logger.error('subscription.update_failed', {
        subscriptionId: existingSub.id,
        newStatus: internalStatus,
        error: error.message,
      })
      throw error
    }
  }

  // 2. Sincronizar membership_status del perfil
  if (data.status === 'cancelled') {
    const { error } = await supabase
      .from('profiles')
      .update({ membership_status: 'cancelled' })
      .eq('id', data.userId)

    if (error) {
      logger.error('subscription.profile_sync_failed', {
        userId: data.userId,
        error: error.message,
      })
    }
  }

  logger.info('subscription.status_updated', {
    externalSubscriptionId: data.externalSubscriptionId,
    userId: data.userId,
    mpStatus: data.status,
    internalStatus,
  })
}
