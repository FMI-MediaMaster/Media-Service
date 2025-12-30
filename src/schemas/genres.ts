import * as z from 'zod';

export const GenreSchema = z.object({
    name: z.string(),
}).strip();
