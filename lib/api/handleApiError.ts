import { ApiError } from "./ApiError";
import { logger } from "../utils/logger";

export function handleApiError(error: unknown) {
    // Error conocido (operacional)
    if (error instanceof ApiError) {
        logger.warn("api.operational_error", {
            code: error.code,
            message: error.message
        })

        return Response.json({
            error: {
                code: error.code,
                message: error.message
            }
        },
            { status: error.statusCode })
    }

    // Error desconocido (no operacional)
    logger.error("api.unexpected_error", {
        error: error
    })

    return Response.json({
        error: {
            code: "INTERNAL_ERROR",
            message: "Something went wrong"
        }
    }, { status: 500 })
}