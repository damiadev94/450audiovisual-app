import { handleApiError } from "./handleApiError"

type RouteContext = { params: Promise<Record<string, string>> }

type RouteHandler = (req: Request, context?: RouteContext) => Promise<Response>

export function withErrorHandler(handler: RouteHandler): RouteHandler {
    return async function (req, context) {
        try {
            return await handler(req, context)
        } catch (error) {
            return handleApiError(error)
        }
    }
}