import { BaseRepository } from "./base.repository";

export class ProfileRepository extends BaseRepository {
    async findById(userId: string) {
        const { data, error } = await this.db
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single()

        if (error) throw error

        return data
    }

    async updateMembership(userId: string, expiresAt: Date) {
        const { error } = await this.db
            .from("profiles")
            .update({ membership_expires_at: expiresAt })
            .eq("id", userId)

        if (error) throw error
    }
}