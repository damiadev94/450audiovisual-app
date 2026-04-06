import { z } from "zod";

export const MPWebhookSchema = z.object({
    action: z.string(),
    data: z.object({
        id: z.union([z.string(), z.number()])
    }),
    type: z.string(),
});

export type MPWebhookInput = z.infer<typeof MPWebhookSchema>;