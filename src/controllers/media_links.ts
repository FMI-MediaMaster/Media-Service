import { MediaM2MController } from './template_media_m2m';
import type { Tables } from '@types';
import { MediaLinkSchema } from '@schemas';

export class MediaLinkController extends MediaM2MController<Tables<'media_link'>> {
    constructor() {
        super({
            resource: 'link',
            createSchema: MediaLinkSchema,
        });
    };
};
