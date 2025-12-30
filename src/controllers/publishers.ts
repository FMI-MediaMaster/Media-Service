import { Controller } from './template';
import type { Tables } from '@types';
import { PublisherSchema } from '@schemas';

export class PublisherController extends Controller<Tables<'publisher'>> {
    constructor() {
        super({
            resource: 'publisher',
            createSchema: PublisherSchema,
            updateSchema: PublisherSchema,
            tableDependenciesToIdMap: { 'media_publisher': 'publisher_id' },
        });
    };
};
