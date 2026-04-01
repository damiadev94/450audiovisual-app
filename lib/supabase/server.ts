import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Crea un cliente de Supabase para ser usado en el LADO DEL SERVIDOR (Server Components, API Routes, Server Actions).
 * Utiliza las cookies para manejar la sesión de forma segura.
 */
export async function createClient() {
  const cookieStore = await cookies()

  const client = createServerClient<Database, 'public'>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // El método setAll puede fallar si se llama desde un Server Component.
            // Esto es normal y se maneja mediante el middleware.
          }
        },
      },
    }
  )
  // ⭐ CLAVE ABSOLUTA
  return client as SupabaseClient<Database, 'public'>
}
