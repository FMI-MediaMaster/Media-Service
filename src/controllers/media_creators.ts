import { MediaM2MController } from './template_media_m2m';
import type { Tables } from '@types';
import { MediaCreatorSchema } from '@schemas';

export class MediaCreatorController extends MediaM2MController<Tables<'media_creator'>> {
    constructor() {
        super({
            resource: 'creator',
            createSchema: MediaCreatorSchema,
        });
    };
};
