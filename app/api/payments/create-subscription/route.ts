import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createSubscription } from '@/services/payments.service';
import {
  CreateSubscriptionSchema,
} from "@/lib/validation/payments.schema";
import { subscriptionRateLimit } from '@/lib/api/rate-limit';
import { withErrorHandler } from '@/lib/api/withErrorHandler';

export async function POST(request: Request) {
  return withErrorHandler(async () => {

    /**
     * 1️⃣ Validar input externo (boundary validation)
     */
    const body = await request.json().catch(() => ({}));

    const parsed = CreateSubscriptionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos de suscripción inválidos' },
        { status: 400 }
      );
    }

    /**
  * 2️⃣ Obtener usuario autenticado
  */
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { email } = user;
    if (!email) {
      return NextResponse.json({ error: 'Usuario sin email' }, { status: 400 });
    }

    // Crear la suscripción mensual en MercadoPago
    const initPoint = await createSubscription(user.id, email);

    if (!initPoint) {
      throw new Error('No se pudo generar el init_point de MercadoPago');
    }

    return NextResponse.json({ url: initPoint });
  })
}
