import { Controller } from './template';
import type { Tables } from '@types';
import { CreatorSchema } from '@schemas/creators';

export default class CreatorController extends Controller<Tables<'creator'>> {
    constructor() {
        super({
            resource: 'creator',
            createSchema: CreatorSchema,
            updateSchema: CreatorSchema,
            tableDependencies: ['media_creator'],
        });
    };
};
