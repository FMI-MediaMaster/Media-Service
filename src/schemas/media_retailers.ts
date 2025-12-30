import * as z from 'zod';

export const MediaRetailerSchema = z.object({
    media_id: z.number().int(),
    retailer_id: z.number().int(),
}).strip();
