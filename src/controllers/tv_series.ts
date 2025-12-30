import { Controller } from './template';
import type { Tables } from '@types';
import { TvSeriesSchema } from '@schemas';

export class TvSeriesController extends Controller<Tables<'tv_series'>> {
    constructor() {
        super({
            resource: 'tv_series',
            createSchema: TvSeriesSchema,
            updateSchema: TvSeriesSchema,
            isMediaType: true,
            tableDependenciesToIdMap: { 'season': 'tv_series_id' },
            tableMediaDependenciesToIdMap: {
                'media_creator': 'media_id',
                'media_genre': 'media_id',
                'media_link': 'media_id',
                'media_platform': 'media_id',
                'media_publisher': 'media_id',
                'media_retailer': 'media_id',
                'media_series': 'media_id',
                'media_user': 'media_id',
                'media_user_source': 'media_id',
                'media_user_tag': 'media_id',
                'note': 'media_id',
                'wishlist': 'media_id',
            },
        });
    };
};
