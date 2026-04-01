import { handleApiError } from "./handleApiError"

export function withErrorHandler(
    handler: (req: Request) => Promise<Response>
) {
    return async function (req: Request) {
        try {
            return await handler(req)
        } catch (error) {
            return handleApiError(error)
        }
    }
}