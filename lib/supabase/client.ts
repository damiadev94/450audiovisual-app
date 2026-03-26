import { createBrowserClient } from '@supabase/ssr'

/**
 * Crea un cliente de Supabase para ser usado en el LADO DEL CLIENTE (Browser).
 * Este cliente ya conoce la URL y la Anon Key configuradas en las variables de entorno.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
