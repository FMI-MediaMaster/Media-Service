import * as z from 'zod';

export const MediaCreatorSchema = z.object({
    media_id: z.number(),
    creator_id: z.number(),
}).strip();
