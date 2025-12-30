import * as z from 'zod';

export const PublisherSchema = z.object({
    name: z.string(),
}).strip();
