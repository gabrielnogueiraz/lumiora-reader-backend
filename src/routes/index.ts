import { Router } from 'express';
import { userRoutes } from './user.routes';
import { bookRoutes } from './book.routes';
import { favoriteRoutes } from './favorite.routes';

const routes = Router();

routes.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

routes.use('/users', userRoutes);
routes.use('/books', bookRoutes);
routes.use('/favorites', favoriteRoutes);

export { routes };