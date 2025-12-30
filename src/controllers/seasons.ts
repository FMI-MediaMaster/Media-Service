import { Controller } from './template';
import type { Tables } from '@types';
import {
    SeasonCreateSchema,
    SeasonUpdateSchema,
} from '@schemas';

export class SeasonController extends Controller<Tables<'season'>> {
    constructor() {
        super({
            resource: 'season',
            createSchema: SeasonCreateSchema,
            updateSchema: SeasonUpdateSchema,
            noReadByName: true,
        });
    };
};
