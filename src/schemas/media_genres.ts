import * as z from 'zod';

export const MediaGenreSchema = z.object({
    media_id: z.number().int(),
    genre_id: z.number().int(),
}).strip();
