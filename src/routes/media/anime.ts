import { createDefaultRouter } from './router-default';

export type Anime = {
    id?: string;
    title: string;
    episodes: number;
    studio: string;
};

export const animeRouter = createDefaultRouter<Anime>({
    resource: 'anime',
    discardInCreate: ['id'],
    validateInCreate: ['title', 'episodes', 'studio'],
});
