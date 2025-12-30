import { MediaM2MController } from './template_media_m2m';
import type { Tables } from '@types';
import { MediaGenreSchema } from '@schemas';

export class MediaGenreController extends MediaM2MController<Tables<'media_genre'>> {
    constructor() {
        super({
            resource: 'genre',
            createSchema: MediaGenreSchema,
        });
    };
};
