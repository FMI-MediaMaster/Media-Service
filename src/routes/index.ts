import { Router } from 'express';
import { createRouter, createMediaM2MRouter } from '@media-master/express-crud-router';
import creatorController from '@controllers/creators';
import mediaCreatorController from '@controllers/media_creators';
import appAchievementController from '@controllers/app_achievements';
import userAchievementController from '@controllers/user_achievements';

const routes: Router = Router();
routes.use('/creators', createRouter(creatorController));
routes.use('/media_creators', createMediaM2MRouter(mediaCreatorController));
routes.use('/app_achievements', createRouter(appAchievementController));
routes.use('/user_achievements', createRouter(userAchievementController));

export default routes;

