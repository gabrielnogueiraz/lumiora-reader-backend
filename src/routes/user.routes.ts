import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/auth';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', userController.create);
userRoutes.post('/sessions', userController.login);
userRoutes.get('/profile', authMiddleware, userController.profile);

export { userRoutes };