import { Controller } from './template';
import type { Tables } from '@types';
import { BookSchema } from '@schemas';

export class BookController extends Controller<Tables<'book'>> {
    constructor() {
        super({
            resource: 'book',
            createSchema: BookSchema,
            updateSchema: BookSchema,
            isMediaType: true,
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
