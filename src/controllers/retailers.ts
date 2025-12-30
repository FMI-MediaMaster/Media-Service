import { Controller } from './template';
import type { Tables } from '@types';
import { RetailerSchema } from '@schemas';

export class RetailerController extends Controller<Tables<'retailer'>> {
    constructor() {
        super({
            resource: 'retailer',
            createSchema: RetailerSchema,
            updateSchema: RetailerSchema,
            tableDependenciesToIdMap: { 'media_retailer': 'retailer_id' },
        });
    };
};
