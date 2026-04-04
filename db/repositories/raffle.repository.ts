import { BaseRepository } from "./base.repository"

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface Raffle {
    id: string
    title: string
    description: string | null
    prize: string
    is_active: boolean
    draw_date: string
    winner_user_id: string | null
    created_at: string
}

export interface CreateRaffleInput {
    title: string
    description?: string
    prize: string
    draw_date: string
}

export interface UpdateRaffleInput {
    title?: string
    description?: string
    prize?: string
    is_active?: boolean
    draw_date?: string
    winner_user_id?: string
}

const RAFFLE_COLUMNS = "id, title, description, prize, is_active, draw_date, winner_user_id, created_at"

// ─── Repository ───────────────────────────────────────────────────────────────

export class RaffleRepository extends BaseRepository {

    // Devuelve array — puede haber más de un sorteo activo
    async findActive(): Promise<Raffle[]> {
        const { data, error } = await this.db
            .from("raffles")
            .select(RAFFLE_COLUMNS)
            .eq("is_active", true)
            .order("draw_date", { ascending: true })

        if (error) this.handleError(error, "Raffle.findActive")

        return data ?? []
    }

    async findById(id: string): Promise<Raffle> {
        const { data, error } = await this.db
            .from("raffles")
            .select(RAFFLE_COLUMNS)
            .eq("id", id)
            .single()

        if (error) this.handleError(error, "Raffle")

        return data
    }

    async create(input: CreateRaffleInput): Promise<Raffle> {
        const { data, error } = await this.db
            .from("raffles")
            .insert(input)
            .select(RAFFLE_COLUMNS)
            .single()

        if (error) this.handleError(error, "Raffle.create")

        return data
    }

    async update(id: string, input: UpdateRaffleInput): Promise<Raffle> {
        const { data, error } = await this.db
            .from("raffles")
            .update(input)
            .eq("id", id)
            .select(RAFFLE_COLUMNS)
            .single()

        if (error) this.handleError(error, "Raffle.update")

        return data
    }

    async setWinner(raffleId: string, winnerUserId: string): Promise<void> {
        const { error } = await this.db
            .from("raffles")
            .update({ winner_user_id: winnerUserId, is_active: false })
            .eq("id", raffleId)

        if (error) this.handleError(error, "Raffle.setWinner")
    }

    async delete(id: string): Promise<void> {
        const { error } = await this.db
            .from("raffles")
            .delete()
            .eq("id", id)

        if (error) this.handleError(error, "Raffle.delete")
    }
}