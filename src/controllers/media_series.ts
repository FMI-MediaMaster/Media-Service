import { MediaM2MController } from './template_media_m2m';
import type { Tables } from '@types';
import {
    MediaSeriesCreateSchema,
    MediaSeriesUpdateSchema,
} from '@schemas';

export class MediaSeriesController extends MediaM2MController<Tables<'media_series'>> {
    constructor() {
        super({
            resource: 'series',
            createSchema: MediaSeriesCreateSchema,
            updateSchema: MediaSeriesUpdateSchema,
        });
    };
};
