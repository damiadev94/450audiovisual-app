import { z } from "zod";

/**
 * Schema para crear suscripción.
 * Hoy no requiere datos,
 * pero permite extender fácilmente.
 */
export const CreateSubscriptionSchema = z.object({
    // preparado para futuro:
    planId: z.string().optional(),
    referralCode: z.string().optional(),
});

/**
 * Tipo inferido automáticamente desde Zod
 */
export type CreateSubscriptionInput =
    z.infer<typeof CreateSubscriptionSchema>;