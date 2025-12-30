import { MediaM2MController } from './template_media_m2m';
import type { Tables } from '@types';
import { MediaPlatformSchema } from '@schemas';

export class MediaPlatformController extends MediaM2MController<Tables<'media_platform'>> {
    constructor() {
        super({
            resource: 'platform',
            createSchema: MediaPlatformSchema,
        });
    };
};
