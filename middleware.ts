import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'
import { Database } from '@/types/supabase/supabase'

/**
 * Middleware de Next.js — se ejecuta en cada request.
 * 
 * Funciones:
 * 1. Refrescar la sesión de Supabase (token de auth).
 * 2. Proteger rutas que requieren autenticación (redirigir a /login si no hay sesión).
 * 
 * NOTA: La verificación de membresía NO se hace aquí (sería una query extra en cada request).
 * La membresía se verifica a nivel de page/layout con requireActiveMembership().
 */

// Rutas que requieren que el usuario esté autenticado
const PROTECTED_PATHS = ['/dashboard', '/profile', '/raffles', '/referrals']

export async function middleware(request: NextRequest) {
  // 1. Refrescar sesión (siempre)
  const response = await updateSession(request)

  // 2. Si la ruta es protegida, verificar que hay un usuario autenticado
  const path = request.nextUrl.pathname
  const isProtected = PROTECTED_PATHS.some(p => path.startsWith(p))

  if (isProtected) {
    // Crear un client ligero solo para verificar la sesión
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll() {
            // No necesitamos setear cookies aquí, updateSession ya lo hizo
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('next', path)
      return NextResponse.redirect(loginUrl)
    }
  }

  return response
}

export const config = {
  // Configuración de los paths donde se debe ejecutar el middleware
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/webhooks (webhooks no tienen sesión de usuario)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/webhooks|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
