import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/supabase'

type ProfileRow = Database['public']['Tables']['profiles']['Row']

/**
 * GUARD CENTRALIZADO DE MEMBRESÍA
 * 
 * Única fuente de verdad para verificar si un usuario tiene acceso premium.
 * Uso en Server Components y API Routes:
 * 
 *   const result = await requireActiveMembership()
 *   if (!result.authorized) {
 *     redirect('/pricing')
 *   }
 *   // result.profile está disponible con datos del usuario
 */

type MembershipResult =
  | { authorized: true; profile: ProfileRow }
  | { authorized: false; reason: 'unauthenticated' | 'expired' | 'no_membership' }

export async function requireActiveMembership(): Promise<MembershipResult> {
  const supabase = await createClient()

  // 1. Verificar sesión
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { authorized: false, reason: 'unauthenticated' }
  }

  // 2. Obtener perfil completo
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    return { authorized: false, reason: 'unauthenticated' }
  }

  // 3. Administradores siempre tienen acceso
  if (profile.is_admin) {
    return { authorized: true, profile }
  }

  // 4. Verificar membresía activa
  if (!profile.membership_expires_at) {
    return { authorized: false, reason: 'no_membership' }
  }

  const expiresAt = new Date(profile.membership_expires_at)
  if (expiresAt <= new Date()) {
    return { authorized: false, reason: 'expired' }
  }

  return { authorized: true, profile }
}

/**
 * Versión simplificada que retorna el perfil del usuario autenticado
 * sin verificar membresía (para rutas que solo requieren login).
 */
export async function requireAuth(): Promise<
  | { authorized: true; profile: ProfileRow }
  | { authorized: false }
> {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    return { authorized: false }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return { authorized: false }
  }

  return { authorized: true, profile }
}
