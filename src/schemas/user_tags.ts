import * as z from 'zod';

export const UserTagCreateSchema = z.object({
    user_id: z.uuid(),
    name: z.string(),
    media_type: z.string().optional().nullable(),
}).strip();

export const UserTagUpdateSchema = UserTagCreateSchema
    .omit({ user_id: true })
    .partial();
