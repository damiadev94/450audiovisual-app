import { BaseRepository } from "./base.repository";

export class SubscriptionRepository extends BaseRepository {
    async findByUserId(userId: string) {
        const { data, error } = await this.db
            .from("subscriptions")
            .select("*")
            .eq("user_id", userId)
            .single()

        if (error) throw error

        return data
    }

    async create(data: any) {
        const { error } = await this.db
            .from("subscriptions")
            .insert(data)

        if (error) throw error
    }

    async update(id: string, data: any) {
        const { error } = await this.db
            .from("subscriptions")
            .update(data)
            .eq("id", id)

        if (error) throw error
    }

    async delete(id: string) {
        const { error } = await this.db
            .from("subscriptions")
            .delete()
            .eq("id", id)

        if (error) throw error
    }

    async findByRaffleId(raffleId: string) {
        const { data, error } = await this.db
            .from("subscriptions")
            .select("*")
            .eq("raffle_id", raffleId)
            .single()

        if (error) throw error

        return data
    }
}