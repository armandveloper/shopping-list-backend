import { Router } from 'express';
import { param, query } from 'express-validator';
import {
	deleteHistoryEntry,
	getUserHistory,
	getUserHistoryEntry,
} from '../controllers/history.controller';
import checkError from '../middlewares/checkError';

const router = Router();

router.get(
	'/:id',
	[
		param('id', 'A valid user id is required').isMongoId(),
		query('offset', 'Offset must be a positive number')
			.toInt()
			.isInt({ min: 0 })
			.optional({ nullable: true }),
		query('limit', 'Limit must be a positive number')
			.toInt()
			.isInt({ min: 1 })
			.optional({ nullable: true }),
		checkError,
	],
	getUserHistory
);

router.get(
	'/entry/:id',
	[
		param('id', 'A valid history entry id is required').isMongoId(),
		checkError,
	],
	getUserHistoryEntry
);

router.delete(
	'/:id',
	[
		param('id', 'A valid history entry id is required').isMongoId(),
		checkError,
	],
	deleteHistoryEntry
);

export default router;
