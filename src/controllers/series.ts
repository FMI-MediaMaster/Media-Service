import { Controller } from './template';
import type { Tables } from '@types';
import { SeriesSchema } from '@schemas';

export class SeriesController extends Controller<Tables<'series'>> {
    constructor() {
        super({
            resource: 'series',
            createSchema: SeriesSchema,
            updateSchema: SeriesSchema,
            tableDependenciesToIdMap: { 'media_series': 'series_id' },
            noReadByName: true,
        });
    };
};
