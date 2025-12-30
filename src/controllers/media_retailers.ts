import { MediaM2MController } from './template_media_m2m';
import type { Tables } from '@types';
import { MediaRetailerSchema } from '@schemas';

export class MediaRetailerController extends MediaM2MController<Tables<'media_retailer'>> {
    constructor() {
        super({
            resource: 'retailer',
            createSchema: MediaRetailerSchema,
        });
    };
};
