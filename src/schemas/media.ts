import * as z from 'zod';
import { MediaType } from '../types/media';

export const BaseMediaSchema = z.object({
    title: z.string().min(1),
    type: z.nativeEnum(MediaType),
});

export const BookSchema = BaseMediaSchema.extend({
    author: z.string().min(1),
    pages: z.number().int().positive(),
}).refine(data => data.type === MediaType.BOOK, {
    message: 'Invalid media type for book',
});

export const MovieSchema = BaseMediaSchema.extend({
    director: z.string().min(1),
    durationMinutes: z.number().int().positive(),
}).refine(data => data.type === MediaType.MOVIE, {
    message: 'Invalid media type for movie',
});

export const AnimeSchema = BaseMediaSchema.extend({
    episodes: z.number().int().positive(),
    studio: z.string().min(1),
}).refine(data => data.type === MediaType.ANIME, {
    message: 'Invalid media type for anime',
});

export type BookInput = z.infer<typeof BookSchema>;
export type MovieInput = z.infer<typeof MovieSchema>;
export type AnimeInput = z.infer<typeof AnimeSchema>;
