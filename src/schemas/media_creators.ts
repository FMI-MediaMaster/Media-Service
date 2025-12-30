import * as z from 'zod';

export const MediaCreatorSchema = z.object({
    media_id: z.number().int(),
    creator_id: z.number().int(),
}).strip();
