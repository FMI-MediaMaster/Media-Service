import * as z from 'zod';

export const BookSchema = z.object({
    language: z.string().nullable(),
    format: z.string().nullable(),
    nr_pages: z.number().nullable(),
 
    name: z.string(),
    description: z.string().nullable(),
    release_date: z.preprocess(
        (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
        z.date(),
    ).nullable(),
    critics_score: z.number().nullable(),
    community_score: z.number().nullable(),

    genres: z.array(z.string()).nullable(),
    creators: z.array(z.string()).nullable(),
    publishers: z.array(z.string()).nullable(),
    platforms: z.array(z.string()).nullable(),
    retailers: z.array(z.string()).nullable(),
    series_name: z.array(z.string()).nullable(),
    links: z.array(
        z.object({
            name: z.string(),
            href: z.string(),
        })
    ).nullable(),
    series: z.array(
        z.object({
            name: z.string(),
            index: z.number(),
        })
    ).nullable(),
}).partial().strip();