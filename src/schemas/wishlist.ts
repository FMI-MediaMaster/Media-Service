import * as z from 'zod';

export const WishlistUpdateSchema = z.object({
    name: z.string().nullable(),
    user_score: z.number().int().nullable(),
    added_date: z.preprocess(
        (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
        z.date(),
    ).nullable(),
    cover: z.string().nullable(),
    series: z.string().nullable(),
    icon: z.string().nullable(),
    background: z.string().nullable(),
}).partial().strip();

export const WishlistCreateSchema = WishlistUpdateSchema
    .extend({ 
        user_id: z.uuid(),
        media_id: z.number().int(),
    });