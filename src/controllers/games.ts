import { Controller } from './template';
import type { Tables } from '@types';
import { GameSchema } from '@schemas/games';

export default class GameController extends Controller<Tables<'game'>> {
    constructor() {
        super({
            resource: 'game',
            nameField: 'name',
            createSchema: GameSchema,
            updateSchema: GameSchema,
            isMediaType: true,
            tableDependenciesToIdMap: {
                'game_achievement': 'game_id',
                'media_creator': 'media_id',
                'media_genre': 'media_id',
                'media_link': 'media_id',
                'media_platform': 'media_id',
                'media_publisher': 'media_id',
                'media_retailer': 'media_id',
                'media_series': 'media_id',
                'media_user': 'media_id',
                'media_user_source': 'media_id',
                'media_user_tag': 'media_id',
                'note': 'media_id',
                'wishlist': 'media_id',
            },
        });
    };
};
