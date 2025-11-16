import { Router } from 'express';
import MediaController from '../controllers/media';

const router: Router = Router();
const controller = new MediaController();

router.post('/', controller.create);
router.get('/', controller.readAll);
router.get('/:id', controller.read);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
