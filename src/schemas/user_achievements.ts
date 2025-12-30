import * as z from 'zod';

export const UserAchievementCreateSchema = z.object({
    user_id: z.uuid(),
    app_achievement_id: z.number(),
    unlock_date: z.preprocess(
        (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
        z.date(),
    ),
}).strip();

export const UserAchievementUpdateSchema = UserAchievementCreateSchema
    .omit({
        user_id: true,
        app_achievement_id: true,
    })
    .partial();
