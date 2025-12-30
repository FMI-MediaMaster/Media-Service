import { MediaM2MController } from './template_media_m2m';
import type { Tables } from '@types';
import { MediaUserSourceSchema } from '@schemas';

export class MediaUserSourceController extends MediaM2MController<Tables<'media_user_source'>> {
    constructor() {
        super({
            resource: 'source',
            createSchema: MediaUserSourceSchema,
            requiresUser: true,
        });
    };
};
