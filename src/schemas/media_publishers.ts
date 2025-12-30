import * as z from 'zod';

export const MediaPublisherSchema = z.object({
    media_id: z.number().int(),
    publisher_id: z.number().int(),
}).strip();
