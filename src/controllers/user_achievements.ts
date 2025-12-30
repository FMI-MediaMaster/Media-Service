import { Controller } from './template';
import type { Tables } from '@types';
import {
    UserAchievementCreateSchema,
    UserAchievementUpdateSchema,
} from '@schemas';

export class UserAchievementController extends Controller<Tables<'user_achievement'>> {
    constructor() {
        super({
            resource: 'user_achievement',
            createSchema: UserAchievementCreateSchema,
            updateSchema: UserAchievementUpdateSchema,
            requiresUser: true,
            idField: 'app_achievement_id',
            assureExistanceInTable: 'app_achievement',
            noReadByName: true,
        });
    };
};
