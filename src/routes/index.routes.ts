import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import authRoutes from './auth.routes';
import itemsRoutes from './items.routes';
import categoriesRoutes from './categories.routes';
import cartRoutes from './cart.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/items', isAuthenticated, itemsRoutes);
router.use('/categories', isAuthenticated, categoriesRoutes);
router.use('/cart', isAuthenticated, cartRoutes);

export default router;
