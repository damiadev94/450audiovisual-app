import { BaseRepository } from "./base.repository";

export class PaymentRepository extends BaseRepository {
    async create(data: any) {
        const { error } = await this.db
            .from("payments")
            .insert(data)

        if (error) throw error
    }

    async update(id: string, data: any) {
        const { error } = await this.db
            .from("payments")
            .update(data)
            .eq("id", id)

        if (error) throw error
    }

    async findByUserId(userId: string) {
        const { data, error } = await this.db
            .from("payments")
            .select("*")
            .eq("user_id", userId)
            .single()

        if (error) throw error

        return data
    }

    async findByRaffleId(raffleId: string) {
        const { data, error } = await this.db
            .from("payments")
            .select("*")
            .eq("raffle_id", raffleId)
            .single()

        if (error) throw error

        return data
    }

    async findById(id: string) {
        const { data, error } = await this.db
            .from("payments")
            .select("*")
            .eq("id", id)
            .single()

        if (error) throw error

        return data
    }

    async delete(id: string) {
        const { error } = await this.db
            .from("payments")
            .delete()
            .eq("id", id)

        if (error) throw error
    }
}