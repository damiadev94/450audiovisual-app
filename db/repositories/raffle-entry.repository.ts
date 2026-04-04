import { BaseRepository } from "./base.repository"
import { RaffleAlreadyEnteredError } from "@/lib/api/ApiError"

export interface RaffleEntry {
    id: string
    raffle_id: string
    user_id: string
    entered_at: string
}

const ENTRY_COLUMNS = "id, raffle_id, user_id, entered_at"

export class RaffleEntryRepository extends BaseRepository {

    async findByRaffleId(raffleId: string): Promise<RaffleEntry[]> {
        const { data, error } = await this.db
            .from("raffle_entries")
            .select(ENTRY_COLUMNS)
            .eq("raffle_id", raffleId)

        if (error) this.handleError(error, "RaffleEntry.findByRaffleId")

        return data ?? []
    }

    async findByUserAndRaffle(userId: string, raffleId: string): Promise<RaffleEntry | null> {
        const { data, error } = await this.db
            .from("raffle_entries")
            .select(ENTRY_COLUMNS)
            .eq("user_id", userId)
            .eq("raffle_id", raffleId)
            .maybeSingle()

        if (error) this.handleError(error, "RaffleEntry.findByUserAndRaffle")

        return data
    }

    async create(userId: string, raffleId: string): Promise<RaffleEntry> {
        // Chequeo de duplicado antes de insertar
        const existing = await this.findByUserAndRaffle(userId, raffleId)
        if (existing) throw new RaffleAlreadyEnteredError()

        const { data, error } = await this.db
            .from("raffle_entries")
            .insert({ user_id: userId, raffle_id: raffleId })
            .select(ENTRY_COLUMNS)
            .single()

        if (error) this.handleError(error, "RaffleEntry.create")

        return data
    }

    async countByRaffleId(raffleId: string): Promise<number> {
        const { count, error } = await this.db
            .from("raffle_entries")
            .select("id", { count: "exact", head: true })  // head: true = no trae filas
            .eq("raffle_id", raffleId)

        if (error) this.handleError(error, "RaffleEntry.countByRaffleId")

        return count ?? 0
    }
}