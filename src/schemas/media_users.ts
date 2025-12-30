import * as z from 'zod';

export const MediaUserUpdateSchema = z.object({
    name: z.string().nullable(),
    user_score: z.number().int().nullable(),
    added_date: z.preprocess(
        (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
        z.date(),
    ).nullable(),
    cover: z.string().nullable(),
    status: z.string().nullable(),
    series: z.string().nullable(),
    icon: z.string().nullable(),
    background: z.string().nullable(),
    game_time: z.number().int().default(0),
    book_read_pages: z.number().int().default(0),
    nr_seen_episodes: z.number().int().default(0),
    manga_read_chapters: z.number().int().default(0),
    movie_watched_seconds: z.number().int().default(0),
}).partial().strip();

export const MediaUserCreateSchema = MediaUserUpdateSchema
    .extend({ 
        user_id: z.uuid(),
        media_id: z.number().int(),
    });