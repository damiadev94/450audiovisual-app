import { createClient } from '@/lib/supabase/server'

/**
 * SERVICIO DE MEMBRESÍA
 * 
 * Contiene la lógica para extender el acceso de los usuarios basándose en sus pagos.
 */

const DAYS_PER_PAYMENT = 30

/**
 * Extiende la membresía de un usuario por 30 días.
 * Si la membresía ya está activa, se suma a la fecha de expiración actual.
 * Si ha expirado o es nueva, comienza desde ahora.
 */
export async function extendMembership(userId: string) {
  const supabase = await createClient()

  // 1. Obtener el estado actual de la membresía
  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('membership_expires_at')
    .eq('id', userId)
    .single()

  if (fetchError || !profile) {
    console.error('Error al obtener el perfil para extender membresía:', fetchError)
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

  // 3. Actualizar en la base de datos
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ 
      membership_expires_at: newExpiration.toISOString() 
    })
    .eq('id', userId)

  if (updateError) {
    console.error('Error al actualizar fecha de membresía:', updateError)
    throw updateError
  }

  return newExpiration
}
