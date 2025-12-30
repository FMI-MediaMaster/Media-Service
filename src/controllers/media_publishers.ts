import { MediaM2MController } from './template_media_m2m';
import type { Tables } from '@types';
import { MediaPublisherSchema } from '@schemas';

export class MediaPublisherController extends MediaM2MController<Tables<'media_publisher'>> {
    constructor() {
        super({
            resource: 'publisher',
            createSchema: MediaPublisherSchema,
        });
    };
};
