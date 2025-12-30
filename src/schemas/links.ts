import * as z from 'zod';

export const LinkCreateSchema = z.object({
    name: z.string(),
    href: z.string(),
}).strip();

export const LinkUpdateSchema = LinkCreateSchema.partial();