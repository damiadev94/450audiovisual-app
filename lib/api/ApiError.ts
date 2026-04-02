export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly isOperational: boolean;

    constructor(
        message: string,
        statusCode: number = 500,
        code: string = "INTERNAL_ERROR",
        isOperational: boolean = true
    ) {
        super(message); // The Error class always expects a string message here
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;

        // Ensure proper prototype chain for extending built-ins in TypeScript
        Object.setPrototypeOf(this, new.target.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class TooManyRequestsError extends ApiError {
    constructor() {
        super(
            "Too many requests. Try again later.",
            429,
            "RATE_LIMITED"
        )
    }
}