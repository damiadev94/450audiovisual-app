export class ApiError extends Error {
    statusCode: number
    code: string
    isOperational: boolean

    constructor(
        message: string,
        statusCode: 500,
        code: "INTERNAL ERROR"
    ) {
        super(message)
        this.statusCode = statusCode
        this.code = code
        this.isOperational = true
    }
}