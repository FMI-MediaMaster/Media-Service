import * as z from 'zod';

export const AppAchievementCreateSchema = z.object({
    name: z.string(),
    description: z.string(),
    xp: z.number().default(100),
});

export const AppAchievementUpdateSchema = AppAchievementCreateSchema
    .omit({ xp: true }) // remove xp with default
    .extend({ xp: z.number() })
    .partial();
