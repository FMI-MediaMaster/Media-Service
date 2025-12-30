import { Controller } from './template';
import type { Tables } from '@types';
import { AppAchievementCreateSchema, AppAchievementUpdateSchema } from '@schemas/app_achievements';

export default class AppAchievementController extends Controller<Tables<'app_achievement'>> {
    constructor() {
        super({
            resource: 'app_achievement',
            createSchema: AppAchievementCreateSchema,
            updateSchema: AppAchievementUpdateSchema,
            tableDependencies: ['user_achievement'],
        });
    };
};
