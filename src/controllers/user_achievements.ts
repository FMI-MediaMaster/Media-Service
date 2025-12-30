import { Controller } from './template';
import type { Tables } from '@types';
import {
    UserAchievementCreateSchema,
    UserAchievementUpdateSchema,
} from '@schemas/user_achievement';

export default class UserAchivementController extends Controller<Tables<'user_achievement'>> {
    constructor() {
        super({
            resource: 'user_achievement',
            createSchema: UserAchievementCreateSchema,
            updateSchema: UserAchievementUpdateSchema,
            requiresUser: true,
            idField: 'app_achievement_id',
            assureExistanceInTable: 'app_achievement',
            deleteDependencies: false,
            noReadByName: true,
        });
    };
};
