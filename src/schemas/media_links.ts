import * as z from 'zod';

export const MediaLinkSchema = z.object({
    media_id: z.number().int(),
    link_id: z.number().int(),
}).strip();
