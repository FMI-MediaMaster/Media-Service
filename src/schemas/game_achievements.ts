import * as z from 'zod';

export const GameAchievementCreateSchema = z.object({
    game_id: z.number(),
    name: z.string(),
    description: z.string().optional(),
}).strip();

export const GameAchievementUpdateSchema = GameAchievementCreateSchema
    .omit({ game_id: true })
    .partial();
