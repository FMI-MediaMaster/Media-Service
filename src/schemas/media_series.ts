import * as z from 'zod';

export const MediaSeriesCreateSchema = z.object({
    media_id: z.number().int(),
    series_id: z.number().int(),
    index: z.number().int().optional().nullable(),
}).strip();

export const MediaSeriesUpdateSchema = z.object({
    index: z.number().int(),
}).strip();
