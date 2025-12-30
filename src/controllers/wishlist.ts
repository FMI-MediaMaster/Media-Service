import { Controller } from './template';
import type { Tables } from '@types';
import {
    WishlistCreateSchema,
    WishlistUpdateSchema,
} from '@schemas';

export class WishlistController extends Controller<Tables<'wishlist'>> {
    constructor() {
        super({
            resource: 'wishlist',
            createSchema: WishlistCreateSchema,
            updateSchema: WishlistUpdateSchema,
            requiresUser: true,
            idField: 'media_id',
            assureExistanceInTable: 'media',
        });
    };
};
