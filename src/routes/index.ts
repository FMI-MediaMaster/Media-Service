import { Router } from 'express';
import { createRouter, createMediaM2MRouter } from '@media-master/express-crud-router';
import {
    AnimeController,
    BookController,
    CreatorController,
    GameController,
    GenreController,
    NoteController,
    LinkController,
    MangaController,
    MovieController,
    TvSeriesController,
    SeasonController,
    PlatformController,
    PublisherController,
    RetailerController,
    SeriesController,
    UserTagController,
    SourceController,
    MediaGenreController,
    MediaCreatorController,
    MediaLinkController,
    MediaPlatformController,
    MediaPublisherController,
    MediaRetailerController,
    MediaSeriesController,
    MediaUserSourceController,
    MediaUserController,
    WishlistController,
    AppAchievementController,
    GameAchievementController,
    UserAchievementController,
}from '@controllers';

const routes: Router = Router();
routes.use('/creators', createRouter(CreatorController));
routes.use('/anime', createRouter(AnimeController));
routes.use('/books', createRouter(BookController));
routes.use('/games', createRouter(GameController));
routes.use('/genres', createRouter(GenreController));
routes.use('/links', createRouter(LinkController));
routes.use('/notes', createRouter(NoteController));
routes.use('/manga', createRouter(MangaController));
routes.use('/movies', createRouter(MovieController));
routes.use('/seasons', createRouter(SeasonController));
routes.use('/platforms', createRouter(PlatformController));
routes.use('/publishers', createRouter(PublisherController));
routes.use('/retailers', createRouter(RetailerController));
routes.use('/series', createRouter(SeriesController));
routes.use('/sources', createRouter(SourceController));
routes.use('/user_tags', createRouter(UserTagController));
routes.use('/tv_series', createRouter(TvSeriesController));
routes.use('/media_users', createRouter(MediaUserController));
routes.use('/wishlist', createRouter(WishlistController));
routes.use('/app_achievements', createRouter(AppAchievementController));
routes.use('/game_achievements', createRouter(GameAchievementController));
routes.use('/user_achievements', createRouter(UserAchievementController));
routes.use('/media_creators', createMediaM2MRouter(MediaCreatorController));
routes.use('/media_genres', createMediaM2MRouter(MediaGenreController));
routes.use('/media_links', createMediaM2MRouter(MediaLinkController));
routes.use('/media_platforms', createMediaM2MRouter(MediaPlatformController));
routes.use('/media_publishers', createMediaM2MRouter(MediaPublisherController));
routes.use('/media_retailers', createMediaM2MRouter(MediaRetailerController));
routes.use('/media_series', createMediaM2MRouter(MediaSeriesController));
routes.use('/media_user_sources', createMediaM2MRouter(MediaUserSourceController));

export default routes;

