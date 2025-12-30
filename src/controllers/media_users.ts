import { Controller } from './template';
import type { Tables } from '@types';
import {
    MediaUserCreateSchema,
    MediaUserUpdateSchema,
} from '@schemas';

export class MediaUserController extends Controller<Tables<'media_user'>> {
    constructor() {
        super({
            resource: 'media_user',
            createSchema: MediaUserCreateSchema,
            updateSchema: MediaUserUpdateSchema,
            requiresUser: true,
            idField: 'media_id',
            assureExistanceInTable: 'media',
        });
    };
};
