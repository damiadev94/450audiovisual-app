import { z } from "zod";

export const MPWebhookSchema = z.object({
    action: z.string(),
    data: z.union([z.string(), z.number()]).transform(String),
    type: z.string(),
});

export type MPWebhookInput = z.infer<typeof MPWebhookSchema>;