/* import { handleApiError } from "./handleApiError"

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
} */

import { NextResponse } from "next/server";
import { handleApiError } from "./handleApiError";

// 1. Usamos Genéricos para que el HOF se adapte a cualquier ruta
type RouteHandler<T = any> = (
    req: Request,
    context: { params: Promise<T> }
) => Promise<Response> | Response;

export function withErrorHandler<T>(handler: RouteHandler<T>) {
    // 2. Retornamos una función que Next.js reconozca como Route Handler
    return async function (req: Request, context: { params: Promise<T> }) {
        try {
            // Ejecutamos el handler original
            return await handler(req, context);
        } catch (error) {
            // 3. Centralizamos el log y la respuesta de error
            console.error(`[API Error at ${req.url}]:`, error);
            return handleApiError(error);
        }
    };
}
