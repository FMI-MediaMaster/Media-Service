import * as z from 'zod';

export const MediaUserSourceSchema = z.object({
    user_id: z.uuid(),
    media_id: z.number().int(),
    source_id: z.number().int(),
}).strip();
