import { SupabaseClient } from "@supabase/supabase-js";
import { UsersService } from "./users.service";
import { ProfileRepository } from "@/db/repositories/profile.repository";
import { SubscriptionRepository } from "@/db/repositories/subscription.repository";
import { PaymentRepository } from "@/db/repositories/payment.repository";

/**
 * Factory Function: Centraliza la creación del servicio.
 * Si mañana cambias un repositorio, solo lo tocas aquí.
 */
export function makeUsersService(supabase: SupabaseClient): UsersService {
    // 1. Instanciar dependencias (Repositorios)
    const profileRepo = new ProfileRepository(supabase);
    const subscriptionRepo = new SubscriptionRepository(supabase);
    const paymentRepo = new PaymentRepository(supabase);

    // 2. Inyectar dependencias en el Servicio y retornarlo
    return new UsersService(profileRepo, subscriptionRepo, paymentRepo);
}
