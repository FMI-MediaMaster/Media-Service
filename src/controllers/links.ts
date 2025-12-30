import { Controller } from './template';
import type { Tables } from '@types';
import {
    LinkCreateSchema,
    LinkUpdateSchema,
} from '@schemas';

export class LinkController extends Controller<Tables<'link'>> {
    constructor() {
        super({
            resource: 'link',
            createSchema: LinkCreateSchema,
            updateSchema: LinkUpdateSchema,
            tableDependenciesToIdMap: { 'media_link': 'link_id' },
        });
    };
};
