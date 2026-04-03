// Agregá esto ANTES de la clase ApiError
export type ErrorCode =
    | 'INTERNAL_ERROR'
    | 'NOT_FOUND'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'VALIDATION_ERROR'
    | 'CONFLICT'
    | 'RATE_LIMITED'
    | 'EXTERNAL_SERVICE_ERROR'
    | 'SUBSCRIPTION_REQUIRED'
    | 'RAFFLE_ALREADY_ENTERED'

// Cambiá code: string → code: ErrorCode en la clase
export class ApiError extends Error {
    public readonly statusCode: number
    public readonly code: ErrorCode  // ← antes era string
    public readonly isOperational: boolean

    constructor(
        message: string,
        statusCode: number = 500,
        code: ErrorCode = 'INTERNAL_ERROR',  // ← tipado
        isOperational: boolean = true
    ) {
        super(message)
        this.statusCode = statusCode
        this.code = code
        this.isOperational = isOperational
        Object.setPrototypeOf(this, new.target.prototype)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

// ─── Subclases que te faltan ──────────────────────────────────────────────────

export class NotFoundError extends ApiError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 404, 'NOT_FOUND')
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message = 'Authentication required') {
        super(message, 401, 'UNAUTHORIZED')
    }
}

export class ForbiddenError extends ApiError {
    constructor(message = 'Access denied') {
        super(message, 403, 'FORBIDDEN')
    }
}

export class ValidationError extends ApiError {
    public readonly fields?: Record<string, string[]>
    constructor(message: string, fields?: Record<string, string[]>) {
        super(message, 400, 'VALIDATION_ERROR')
        this.fields = fields
    }
}

export class ConflictError extends ApiError {
    constructor(message: string) {
        super(message, 409, 'CONFLICT')
    }
}

export class SubscriptionRequiredError extends ApiError {
    constructor() {
        super('This content requires an active subscription', 403, 'SUBSCRIPTION_REQUIRED')
    }
}

export class RaffleAlreadyEnteredError extends ApiError {
    constructor() {
        super('You already entered this raffle', 409, 'RAFFLE_ALREADY_ENTERED')
    }
}

// TooManyRequestsError ya la tenés — no cambies nada
export class TooManyRequestsError extends ApiError {
    constructor() {
        super(
            "Too many requests. Try again later.",
            429,
            "RATE_LIMITED"
        )
    }
}