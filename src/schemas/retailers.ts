import * as z from 'zod';

export const RetailerSchema = z.object({
    name: z.string(),
}).strip();
