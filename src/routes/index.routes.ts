import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import authRoutes from './auth.routes';
import itemsRoutes from './items.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/items', isAuthenticated, itemsRoutes);

export default router;
