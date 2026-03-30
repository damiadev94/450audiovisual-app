import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/supabase/supabase'

type ProfileRow = Database['public']['Tables']['profiles']['Row']

/**
 * GUARD DE ADMINISTRADOR
 * 
 * Verifica que el usuario autenticado es un administrador.
 * Uso en Server Components y API Routes:
 * 
 *   const result = await requireAdmin()
 *   if (!result.authorized) {
 *     redirect('/dashboard')
 *   }
 */

type AdminResult =
  | { authorized: true; profile: ProfileRow }
  | { authorized: false }

export async function requireAdmin(): Promise<AdminResult> {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { authorized: false }
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    return { authorized: false }
  }

  if (!profile.is_admin) {
    return { authorized: false }
  }

  return { authorized: true, profile }
}
