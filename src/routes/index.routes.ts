import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import itemsRoutes from './items.routes';
import categoriesRoutes from './categories.routes';
import cartRoutes from './cart.routes';
import historyRoutes from './history.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', isAuthenticated, usersRoutes);
router.use('/items', isAuthenticated, itemsRoutes);
router.use('/categories', isAuthenticated, categoriesRoutes);
router.use('/cart', isAuthenticated, cartRoutes);
router.use('/history', isAuthenticated, historyRoutes);

export default router;
