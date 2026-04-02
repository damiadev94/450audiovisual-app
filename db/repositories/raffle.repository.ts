import { BaseRepository } from "./base.repository";

export class RaffleRepository extends BaseRepository {
    async findActive() {
        const { data, error } = await this.db
            .from("raffles")
            .select("*")
            .eq("is_active", true)
            .single()

        if (error) throw error

        return data
    }

    async findById(id: string) {
        const { data, error } = await this.db
            .from("raffles")
            .select("*")
            .eq("id", id)
            .single()

        if (error) throw error

        return data
    }

    async update(id: string, data: any) {
        const { error } = await this.db
            .from("raffles")
            .update(data)
            .eq("id", id)

        if (error) throw error
    }

    async create(data: any) {
        const { error } = await this.db
            .from("raffles")
            .insert(data)

        if (error) throw error
    }

    async delete(id: string) {
        const { error } = await this.db
            .from("raffles")
            .delete()
            .eq("id", id)

        if (error) throw error
    }
}
