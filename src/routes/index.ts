import { Router } from 'express';
import creatorController from '@controllers/creator';
import { createRouter } from '@media-master/express-crud-router';

const routes: Router = Router();
routes.use('/creator', createRouter(creatorController));

export default routes;

