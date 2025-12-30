import { Controller } from './template';
import type { Tables } from '@types';
import { CreatorSchema } from '@schemas';

export class CreatorController extends Controller<Tables<'creator'>> {
    constructor() {
        super({
            resource: 'creator',
            createSchema: CreatorSchema,
            updateSchema: CreatorSchema,
            tableDependenciesToIdMap: { 'media_creator': 'creator_id' },
        });
    };
};
