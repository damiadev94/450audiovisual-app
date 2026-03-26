import { NextResponse } from 'next/server'
// El cliente de servidor de Supabase configurado previamente en lib/supabase/server.ts
import { createClient } from '@/lib/supabase/server'

/**
 * IMPORTANCIA DE ESTA RUTA (CALLBACK DE AUTENTICACIÓN):
 * 
 * 1. PUENTE DE SESIÓN: Esta ruta es el punto de entrada cuando un usuario hace clic en el enlace
 *    de confirmación de su email o inicia sesión vía OAuth. Sin ella, el usuario confirmaría su
 *    cuenta pero la aplicación no sabría cómo "atrapar" esa confirmación para iniciar la sesión.
 * 
 * 2. INTERCAMBIO DE CÓDIGO POR SESIÓN: Captura el parámetro 'code' que envía Supabase y lo
 *    intercambia por una sesión activa en las cookies del servidor. Esto permite que el usuario
 *    quede logueado de forma persistente y segura.
 * 
 * 3. REDIRECCIÓN SEGURA: Una vez validado el login, redirige al usuario a la página de destino
 *    (por defecto al dashboard), asegurando una experiencia de usuario fluida (UX).
 */

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // 'next' es el parámetro opcional de redirección (ej. donde estaba el usuario antes de loguearse)
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    
    // Intercambia el código por una sesión (esto guarda las cookies automáticamente)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // Para entornos como Vercel o Hostinger
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        // En local, redirigimos directamente
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        // En producción, usamos el host reenviado para mayor seguridad
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // Si hay un error o no hay código, redirigimos a una página de error o al login
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
