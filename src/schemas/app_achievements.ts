import * as z from 'zod';

export const AppAchievementCreateSchema = z.object({
    name: z.string(),
    description: z.string(),
    xp: z.number().default(100),
}).strip();

export const AppAchievementUpdateSchema = AppAchievementCreateSchema
    .omit({ xp: true })
    .extend({ xp: z.number() })
    .partial();
