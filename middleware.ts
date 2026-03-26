import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Middleware de Next.js que se ejecuta en cada request.
 * Su función principal es refrescar la sesión de Supabase para mantener al usuario autenticado.
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  // Configuración de los paths donde se debe ejecutar el middleware
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
