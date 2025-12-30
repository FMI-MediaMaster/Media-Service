import * as z from 'zod';

export const SeriesSchema = z.object({
    name: z.string(),
}).strip();
