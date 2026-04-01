import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'
import { logger } from '@/lib/utils/logger'

type ProfileRow = Database['public']['Tables']['profiles']['Row']

/**
 * SERVICIO DE MEMBRESÍA
 * 
 * Contiene la lógica para extender el acceso de los usuarios basándose en sus pagos.
 * Recibe el SupabaseClient como parámetro (inyección de dependencia) para permitir
 * que el webhook use el admin client y las páginas usen el client con sesión.
 */

const DAYS_PER_PAYMENT = 30

/**
 * Extiende la membresía de un usuario por 30 días.
 * Si la membresía ya está activa, se suma a la fecha de expiración actual.
 * Si ha expirado o es nueva, comienza desde ahora.
 */
export async function extendMembership(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<Date> {
  // 1. Obtener el estado actual de la membresía
  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('membership_expires_at')
    .eq('id', userId)
    .single<Pick<ProfileRow, 'membership_expires_at'>>()

  if (fetchError || !profile) {
    logger.error('membership.fetch_failed', {
      userId,
      error: fetchError?.message ?? 'Perfil no encontrado',
    })
    throw new Error('No se pudo encontrar el perfil del usuario')
  }

  const now = new Date()
  let currentExpiration = profile.membership_expires_at
    ? new Date(profile.membership_expires_at)
    : now

  // Si ya expiró, empezamos a contar desde hoy
  if (currentExpiration < now) {
    currentExpiration = now
  }

  // 2. Calcular nueva fecha (+30 días)
  const newExpiration = new Date(currentExpiration)
  newExpiration.setDate(newExpiration.getDate() + DAYS_PER_PAYMENT)

  // 3. Actualizar en la base de datos (membership_expires_at + membership_status)
  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      membership_expires_at: newExpiration.toISOString(),
      membership_status: 'active',
    })
    .eq('id', userId)

  if (updateError) {
    logger.error('membership.update_failed', {
      userId,
      error: updateError.message,
    })
    throw updateError
  }

  logger.info('membership.extended', {
    userId,
    previousExpiration: profile.membership_expires_at,
    newExpiration: newExpiration.toISOString(),
    daysAdded: DAYS_PER_PAYMENT,
  })

  return newExpiration
}
