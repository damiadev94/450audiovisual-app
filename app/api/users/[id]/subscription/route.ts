import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { withErrorHandler } from '@/lib/api/withErrorHandler';
import { createSubscription } from '@/services/payments.service'; // Servicio de MP
import { makeUsersService } from '@/services/users.factory'; // Recomendado usar factory
import { CreateSubscriptionSchema } from "@/lib/validation/payments.schema";

type RouteContext = {
    params: Promise<{ id: string }>;
};

/**
 * GET: Obtiene el estado actual de la suscripción del usuario
 */
export const GET = withErrorHandler(async (req: Request, { params }: RouteContext) => {
    const { id } = await params;
    const supabase = await createClient();
    const usersService = makeUsersService(supabase);

    const subscription = await usersService.getUserSubscription(id);

    if (!subscription) {
        return NextResponse.json({ message: 'No active subscription found' }, { status: 404 });
    }

    return NextResponse.json(subscription);
});

/**
 * POST: Inicia el proceso de suscripción (Genera Checkpoint de Mercado Pago)
 * Antes: api/payments/create-subscription
 */
export const POST = withErrorHandler(async (req: Request, { params }: RouteContext) => {
    const { id: userIdFromParams } = await params;
    const supabase = await createClient();

    // 1. Validar Sesión y Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    // Seguridad: Un usuario no puede crear una suscripción para otro ID
    if (user.id !== userIdFromParams) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 2. Validar Input (Zod)
    const body = await req.json().catch(() => ({}));
    const parsed = CreateSubscriptionSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    // 3. Lógica de Mercado Pago
    if (!user.email) return NextResponse.json({ error: 'Usuario sin email' }, { status: 400 });

    const initPoint = await createSubscription(user.id, user.email);

    if (!initPoint) {
        throw new Error('No se pudo generar el checkout de Mercado Pago');
    }

    return NextResponse.json({ url: initPoint });
});

/**
 * PATCH: Actualizar o cancelar suscripción
 */
export const PATCH = withErrorHandler(async (req: Request, { params }: RouteContext) => {
    const { id } = await params;
    const body = await req.json();
    const supabase = await createClient();
    const usersService = makeUsersService(supabase);

    // Aquí podrías manejar la cancelación lógica o cambio de plan
    const updated = await usersService.updateUserMembership(id, body);
    return NextResponse.json(updated);
});

/**
 * DELETE: Cancelación inmediata (Hard delete o baja total)
 */
export const DELETE = withErrorHandler(async (req: Request, { params }: RouteContext) => {
    const { id } = await params;
    const supabase = await createClient();
    const usersService = makeUsersService(supabase);

    await usersService.cancelSubscription(id);
    return new NextResponse(null, { status: 204 });
});
