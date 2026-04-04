import { SupabaseClient } from "@supabase/supabase-js"
import { BaseRepository } from "./base.repository"
import { ConflictError } from "@/lib/api/ApiError"

export interface User {
    id: string
    email: string
    full_name: string | null
    role: 'user' | 'admin'
    created_at: string
}

export interface CreateUserInput {
    id: string       // viene del auth.users de Supabase
    email: string
    full_name?: string
}

export class UserRepository extends BaseRepository {
    async findById(id: string): Promise<User> {
        const { data, error } = await this.db
            .from("users")
            .select("id, email, full_name, role, created_at")
            .eq("id", id)
            .single()

        if (error) this.handleError(error, 'User')

        return data
    }

    async findByEmail(email: string): Promise<User | null> {
        const { data, error } = await this.db
            .from("users")
            .select("id, email, full_name, role, created_at")
            .eq("email", email)
            .maybeSingle()  // ← no lanza error si no encuentra, devuelve null

        if (error) this.handleError(error, 'User.findByEmail')

        return data
    }

    async create(input: CreateUserInput): Promise<User> {
        // Chequeo explícito antes de insertar
        const existing = await this.findByEmail(input.email)
        if (existing) throw new ConflictError('A user with this email already exists')

        const { data, error } = await this.db
            .from("users")
            .insert({
                id: input.id,
                email: input.email,
                full_name: input.full_name ?? null,
                role: 'user',
            })
            .select("id, email, full_name, role, created_at")
            .single()

        if (error) this.handleError(error, 'User.create')

        return data
    }

    async updateRole(id: string, role: 'user' | 'admin'): Promise<void> {
        const { error } = await this.db
            .from("users")
            .update({ role })
            .eq("id", id)

        if (error) this.handleError(error, 'User.updateRole')
    }
}

