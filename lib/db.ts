import { ProfileRepository } from "@/db/repositories/profile.repository";
import { createClient } from "@supabase/supabase-js";
import { UserRepository } from "@/db/repositories/user.repository";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const db = {
    user: new UserRepository(supabase),
    profile: new ProfileRepository(supabase)
}