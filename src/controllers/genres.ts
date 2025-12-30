import { Controller } from './template';
import type { Tables } from '@types';
import { GenreSchema } from '@schemas';

export class GenreController extends Controller<Tables<'genre'>> {
    constructor() {
        super({
            resource: 'genre',
            createSchema: GenreSchema,
            updateSchema: GenreSchema,
            tableDependenciesToIdMap: { 'media_genre': 'genre_id' },
        });
    };
};
