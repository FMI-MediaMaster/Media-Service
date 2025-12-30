import { Controller } from './template';
import type { Tables } from '@types';
import { PlatformSchema } from '@schemas';

export class PlatformController extends Controller<Tables<'platform'>> {
    constructor() {
        super({
            resource: 'platform',
            createSchema: PlatformSchema,
            updateSchema: PlatformSchema,
            tableDependenciesToIdMap: { 'media_platform': 'platform_id' },
        });
    };
};
