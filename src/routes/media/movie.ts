import { createDefaultRouter } from './router-default';

export type Movie = {
    id?: string;
    title: string;
    director: string;
    durationMinutes: number;
};

export const movieRouter = createDefaultRouter<Movie>({
    resource: 'movie',
    discardInCreate: ['id'],
    validateInCreate: ['title', 'director', 'durationMinutes'],
});
