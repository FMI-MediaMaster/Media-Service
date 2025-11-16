import { Router } from 'express';
import { bookRouter } from './media/book';
import { movieRouter } from './media/movie';
import { animeRouter } from './media/anime';

const routes: Router = Router();

routes.use('/books', bookRouter);
routes.use('/movies', movieRouter);
routes.use('/anime', animeRouter);

export default routes;
