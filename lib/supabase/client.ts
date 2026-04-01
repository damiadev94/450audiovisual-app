import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'

/**
 * Crea un cliente de Supabase para ser usado en el LADO DEL CLIENTE (Browser).
 * Este cliente ya conoce la URL y la Anon Key configuradas en las variables de entorno.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )
}
