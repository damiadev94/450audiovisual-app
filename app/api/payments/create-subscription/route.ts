import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createSubscription } from '@/services/payments.service';

export async function POST(request: Request) {
  try {
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
  } catch (error) {
    console.error('Error creando suscripción:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al crear suscripción' },
      { status: 500 }
    );
  }
}
