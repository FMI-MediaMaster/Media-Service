import * as z from 'zod';

export const PlatformSchema = z.object({
    name: z.string(),
}).strip();
