import * as z from 'zod';

export const GameSchema = z.object({
    igdb_id: z.number().int().nullable(),

    os_minimum: z.string().nullable(),
    os_recommended: z.string().nullable(),

    cpu_minimum: z.string().nullable(),
    cpu_recommended: z.string().nullable(),

    ram_minimum: z.string().nullable(),
    ram_recommended: z.string().nullable(),

    hdd_minimum: z.string().nullable(),
    hdd_recommended: z.string().nullable(),

    gpu_minimum: z.string().nullable(),
    gpu_recommended: z.string().nullable(),

    hltb_main: z.number().int().nullable(),
    hltb_main_side: z.number().int().nullable(),
    hltb_completionist: z.number().int().nullable(),
    hltb_all_styles: z.number().int().nullable(),
    hltb_coop: z.number().int().nullable(),
    hltb_versus: z.number().int().nullable(),
    
    genres: z.array(z.string()).nullable(),
    creators: z.array(z.string()).nullable(),
    publishers: z.array(z.string()).nullable(),
    platforms: z.array(z.string()).nullable(),
    retailers: z.array(z.string()).nullable(),
    series_name: z.array(z.string()).nullable(),
    seasons: z.array(z.string()).nullable(),
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
    
    name: z.string(),
    description: z.string().nullable(),
    release_date: z.preprocess(
        (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
        z.date(),
    ).nullable(),
    critics_score: z.number().nullable(),
    community_score: z.number().nullable(),
}).partial().strip();