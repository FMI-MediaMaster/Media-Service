import * as z from 'zod';

export const SeasonCreateSchema = z.object({
    tv_series_id: z.number().int(),
    name: z.string().optional().nullable(),
    cover: z.string().optional().nullable(),
    nr_episodes: z.number().int().optional().nullable(),
}).strip();

export const SeasonUpdateSchema = SeasonCreateSchema.omit({ tv_series_id: true });