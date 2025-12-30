import * as z from 'zod';

export const MediaPlatformSchema = z.object({
    media_id: z.number().int(),
    platform_id: z.number().int(),
}).strip();
