import { ApiError } from "./ApiError"
import { logger } from "../utils/logger"

// Mapeo de códigos Postgres → respuestas HTTP
const SUPABASE_ERROR_MAP: Record<string, { status: number; code: string; message: string }> = {
    '23505': { status: 409, code: 'CONFLICT', message: 'Resource already exists' },
    '23503': { status: 400, code: 'VALIDATION_ERROR', message: 'Invalid reference' },
    '42501': { status: 403, code: 'FORBIDDEN', message: 'Insufficient permissions' },
    'PGRST116': { status: 404, code: 'NOT_FOUND', message: 'Resource not found' },
}

function isSupabaseError(e: unknown): e is { code: string; message: string } {
    return typeof e === 'object' && e !== null && 'code' in e && 'message' in e
}

export function handleApiError(error: unknown): Response {
    // Error operacional conocido
    if (error instanceof ApiError) {
        logger.warn('api.operational_error', { code: error.code, message: error.message })

        return Response.json(
            {
                success: false,
                error: {
                    code: error.code,
                    message: error.message,
                    // Incluir fields solo en ValidationError
                    ...('fields' in error && error.fields ? { fields: error.fields } : {}),
                },
            },
            { status: error.statusCode }
        )
    }

    // Error de Supabase/Postgres
    if (isSupabaseError(error)) {
        const mapped = SUPABASE_ERROR_MAP[error.code]
        logger.warn('api.supabase_error', { code: error.code, message: error.message })

        return Response.json(
            { success: false, error: { code: mapped?.code ?? 'INTERNAL_ERROR', message: mapped?.message ?? 'Database error' } },
            { status: mapped?.status ?? 500 }
        )
    }

    // Bug inesperado — nunca exponer detalles
    logger.error('api.unexpected_error', { error })

    return Response.json(
        { success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
        { status: 500 }
    )
}