import { BaseRepository } from "./base.repository"
import { SupabaseClient } from "@supabase/supabase-js"

// ─── Tipos ────────────────────────────────────────────────────────────────────

// Estados que devuelve MercadoPago en su webhook
export type PaymentStatus =
    | "approved"
    | "rejected"
    | "pending"
    | "cancelled"
    | "refunded"
    | "in_process"

export type PaymentType = "subscription" | "one_time"

export interface Payment {
    id: string
    user_id: string
    subscription_id: string | null
    mp_payment_id: string           // ID de MercadoPago — clave para webhooks
    mp_status: PaymentStatus
    amount: number
    currency: string                // "ARS", "USD", etc.
    payment_type: PaymentType
    description: string | null
    created_at: string
    updated_at: string
}

export interface CreatePaymentInput {
    user_id: string
    subscription_id?: string
    mp_payment_id: string
    mp_status: PaymentStatus
    amount: number
    currency: string
    payment_type: PaymentType
    description?: string
}

export interface UpdatePaymentInput {
    mp_status?: PaymentStatus
    updated_at?: string
}

const PAYMENT_COLUMNS = "id, user_id, subscription_id, mp_payment_id, mp_status, amount, currency, payment_type, description, created_at, updated_at"

// ─── Repository ───────────────────────────────────────────────────────────────

export class PaymentRepository extends BaseRepository<Payment> {

    // 1. Agregas el constructor
    constructor(db: SupabaseClient) { // Cambia 'any' por el tipo real de tu cliente, ej: SupabaseClient
        super(db);
    }

    async findById(id: string): Promise<Payment> {
        const { data, error } = await this.db
            .from("payments")
            .select(PAYMENT_COLUMNS)
            .eq("id", id)
            .single()

        if (error) this.handleError(error, "Payment")

        return data
    }

    // El más crítico — usado en el webhook de MercadoPago
    // MP manda su propio ID, no el tuyo
    async findByMpPaymentId(mpPaymentId: string): Promise<Payment | null> {
        const { data, error } = await this.db
            .from("payments")
            .select(PAYMENT_COLUMNS)
            .eq("mp_payment_id", mpPaymentId)
            .maybeSingle()

        if (error) this.handleError(error, "Payment.findByMpPaymentId")

        return data
    }

    // Historial completo — un usuario tiene N pagos
    async findByUserId(userId: string): Promise<Payment[]> {
        const { data, error } = await this.db
            .from("payments")
            .select(PAYMENT_COLUMNS)
            .eq("user_id", userId)
            .order("created_at", { ascending: false })

        if (error) this.handleError(error, "Payment.findByUserId")

        return data ?? []
    }

    // Todos los pagos de una suscripción — para historial de renovaciones
    async findBySubscriptionId(subscriptionId: string): Promise<Payment[]> {
        const { data, error } = await this.db
            .from("payments")
            .select(PAYMENT_COLUMNS)
            .eq("subscription_id", subscriptionId)
            .order("created_at", { ascending: false })

        if (error) this.handleError(error, "Payment.findBySubscriptionId")

        return data ?? []
    }

    async create(input: CreatePaymentInput): Promise<Payment> {
        const { data, error } = await this.db
            .from("payments")
            .insert(input)
            .select(PAYMENT_COLUMNS)
            .single()

        if (error) this.handleError(error, "Payment.create")

        return data
    }

    // Solo actualizás el status — lo único que cambia en un pago
    async updateStatus(id: string, status: PaymentStatus): Promise<Payment> {
        const { data, error } = await this.db
            .from("payments")
            .update({
                mp_status: status,
                updated_at: new Date().toISOString()
            })
            .eq("id", id)
            .select(PAYMENT_COLUMNS)
            .single()

        if (error) this.handleError(error, "Payment.updateStatus")

        return data
    }

    // ⚠️ Los pagos NUNCA se eliminan — son registros financieros auditables.
    // Si necesitás "anular", cambiá el status a "cancelled" o "refunded"
    // con updateStatus() de arriba.
}