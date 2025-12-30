import * as z from 'zod';

export const SourceCreateSchema = z.object({
    name: z.string(),
    media_type: z.string().optional().nullable(),
}).strip();

export const SourceUpdateSchema = SourceCreateSchema.partial();