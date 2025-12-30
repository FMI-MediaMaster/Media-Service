import * as z from 'zod';

export const CreatorSchema = z.object({
    name: z.string(),
});
