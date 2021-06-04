import { Router } from 'express';
import { param } from 'express-validator';
import checkError from '../middlewares/checkError';
import { getUserStatistics } from '../controllers/users.controller';

const router = Router();

router.get(
	'/:id/statistics',
	[param('id', 'A valid user id is required').isMongoId(), checkError],
	getUserStatistics
);

export default router;
