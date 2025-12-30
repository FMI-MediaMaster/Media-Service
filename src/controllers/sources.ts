import { Controller } from './template';
import type { Tables } from '@types';
import {
    SourceCreateSchema,
    SourceUpdateSchema,
} from '@schemas';

export class SourceController extends Controller<Tables<'source'>> {
    constructor() {
        super({
            resource: 'source',
            createSchema: SourceCreateSchema,
            updateSchema: SourceUpdateSchema,
            tableDependenciesToIdMap: { 'media_user_source': 'source_id' },
        });
    };
};
