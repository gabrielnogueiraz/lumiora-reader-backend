import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController';
import { authMiddleware } from '../middlewares/auth';

const favoriteRoutes = Router();
const favoriteController = new FavoriteController();

favoriteRoutes.use(authMiddleware);

favoriteRoutes.post('/', favoriteController.create);
favoriteRoutes.get('/', favoriteController.list);
favoriteRoutes.delete('/:id', favoriteController.delete);

export { favoriteRoutes };