import { Controller } from './template';
import type { Tables } from '@types';
import {
    UserTagCreateSchema,
    UserTagUpdateSchema,
} from '@schemas';

export class UserTagController extends Controller<Tables<'user_tag'>> {
    constructor() {
        super({
            resource: 'user_tag',
            createSchema: UserTagCreateSchema,
            updateSchema: UserTagUpdateSchema,
            requiresUser: true,
            noReadByName: true,
        });
    };
};
