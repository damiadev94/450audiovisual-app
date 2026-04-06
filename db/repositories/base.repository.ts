import { SupabaseClient } from "@supabase/supabase-js";
import { ApiError, NotFoundError } from "@/lib/api/ApiError";

export abstract class BaseRepository<T> {
    protected db: SupabaseClient;

    constructor(db: SupabaseClient) {
        this.db = db;
    }

    // ─── Método central de manejo de errores ────────────────────────────────────
    // Todos los repositories lo usan — nunca más "if (error) throw error" crudo

    protected handleError(error: unknown, context?: string): never {
        // Ya es un error nuestro — lo dejamos pasar
        if (error instanceof ApiError) throw error

        // Error de Supabase/Postgres — el handleApiError lo mapea,
        // pero acá podemos agregar contexto útil para el logger
        if (isSupabaseError(error)) {
            // PGRST116 = "0 rows returned" en .single()
            if (error.code === 'PGRST116') {
                throw new NotFoundError(context ?? 'Resource')
            }
            // Los demás errores de Supabase los propaga tal cual
            // handleApiError.ts los mapea con SUPABASE_ERROR_MAP
            throw error
        }

        // Cualquier otra cosa es un bug
        throw new ApiError(
            `Unexpected repository error${context ? ` in ${context}` : ''}`,
            500,
            'INTERNAL_ERROR',
            false  // no operacional
        )
    }
}

// ─── Helper interno ───────────────────────────────────────────────────────────

function isSupabaseError(e: unknown): e is { code: string; message: string } {
    return typeof e === 'object' && e !== null && 'code' in e && 'message' in e
}
