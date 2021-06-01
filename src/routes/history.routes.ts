import { Router } from 'express';
import { param } from 'express-validator';
import {
	deleteHistoryEntry,
	getUserHistory,
	getUserHistoryEntry,
} from '../controllers/history.controller';
import checkError from '../middlewares/checkError';

const router = Router();

router.get(
	'/:id',
	[param('id', 'A valid user id is required').isMongoId(), checkError],
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
