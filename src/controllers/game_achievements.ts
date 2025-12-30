import { Controller } from './template';
import type { Tables } from '@types';
import {
    GameAchievementCreateSchema,
    GameAchievementUpdateSchema
} from '@schemas';

export class GameAchievementController extends Controller<Tables<'game_achievement'>> {
    constructor() {
        super({
            resource: 'game_achievement',
            createSchema: GameAchievementCreateSchema,
            updateSchema: GameAchievementUpdateSchema,
            noReadByName: true,
        });
    };
};
