import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase/supabase'

// Cliente admin que bypasea RLS — SOLO para uso server-side (webhooks, cron)
export function createAdminClient() {
    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )
}
