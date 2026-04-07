import { SupabaseClient } from "@supabase/supabase-js"
import { BaseRepository } from "./base.repository"

// Tipado explícito — nada de inferir desde select("*")
export interface Profile {
    id: string
    full_name: string | null
    avatar_url: string | null
    membership_expires_at: string | null
    created_at: string
}

export class ProfileRepository extends BaseRepository<Profile> {
    async findById(userId: string): Promise<Profile> {
        const { data, error } = await this.db
            .from("profiles")
            .select("id, full_name, avatar_url, membership_expires_at, created_at")
            .eq("id", userId)
            .single()

        if (error) this.handleError(error, 'Profile')  // ← ya no "throw error"

        return data
    }

    async updateMembership(userId: string, expiresAt: Date): Promise<void> {
        const { error } = await this.db
            .from("profiles")
            .update({ membership_expires_at: expiresAt.toISOString() })
            .eq("id", userId)

        if (error) this.handleError(error, 'Profile.updateMembership')
    }
}