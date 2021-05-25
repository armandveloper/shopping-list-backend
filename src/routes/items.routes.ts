import { Router } from 'express';
import { body, param } from 'express-validator';
import checkError from '../middlewares/checkError';
import {
	createItem,
	deleteItem,
	getItem,
	getItems,
	updateItem,
} from '../controllers/items.controller';

const router = Router();

router.post(
	'/',
	[
		body('name', 'The item name is required').not().isEmpty(),
		body('category', 'The category is required').not().isEmpty(),
		body('user', 'A valid user id is required').isMongoId(),
		checkError,
	],
	createItem
);

router.get('/', getItems);
router.get(
	'/:id',
	[param('id', 'A valid item id is required').isMongoId(), checkError],
	getItem
);

router.put(
	'/:id',
	[
		param('id', 'A valid item id is required').isMongoId(),
		body('name', 'The item name is required').not().isEmpty(),
		body('category', 'The category is required').not().isEmpty(),
		checkError,
	],
	updateItem
);

router.delete(
	'/:id',
	[param('id', 'A valid item id is required').isMongoId(), checkError],
	deleteItem
);

export default router;
