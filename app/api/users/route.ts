import { NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/api/withErrorHandler";
import { createClient } from "@/lib/supabase/server";
import { UsersService } from "@/services/users.service";
import { ProfileRepository } from "@/db/repositories/profile.repository";
import { SubscriptionRepository } from "@/db/repositories/subscription.repository";
import { PaymentRepository } from "@/db/repositories/payment.repository";

// Definimos el tipo según el estándar de Next.js 15
type RouteContext = {
  params: Promise<{ id: string }>;
};

export const GET = withErrorHandler(async (req: Request, context: RouteContext) => {
  // 1. Extraer params correctamente (AWAIT necesario en Next 15)
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  // 2. Inicializar DB e Inyectar dependencias
  const supabase = await createClient();

  // Tip: Esto podría moverse a una función 'makeUsersService(supabase)'
  const usersService = new UsersService(
    new ProfileRepository(supabase),
    new SubscriptionRepository(supabase),
    new PaymentRepository(supabase)
  );

  // 3. Lógica de negocio
  const userProfile = await usersService.getUserById(id);

  if (!userProfile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 4. Retornar la data real, no solo el ID
  return NextResponse.json(userProfile, { status: 200 });
});
