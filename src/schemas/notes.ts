import * as z from 'zod';

export const NoteCreateSchema = z.object({
    user_id: z.uuid(),
    media_id: z.number().int(),
    content: z.string(),
    added_date: z.preprocess(
        (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
        z.date(),
    ).optional().nullable(),
    modified_date: z.preprocess(
        (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
        z.date(),
    ).optional().default(new Date()),
}).strip();

export const NoteUpdateSchema = NoteCreateSchema
    .omit({
        user_id: true,
        media_id: true,
    })
    .partial();