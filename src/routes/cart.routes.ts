import { Router } from 'express';
import { body, param } from 'express-validator';
import checkError from '../middlewares/checkError';
import {
	cancelCart,
	completeCart,
	createCart,
	deleteCart,
	getCartById,
	getCartByUser,
	updateCart,
} from '../controllers/cart.controller';

const router = Router();

router.post(
	'/',
	[
		body('name', 'The cart name is required').not().isEmpty(),
		body('user', 'A valid user id is required').isMongoId(),
		body('items', 'The item list must have one item at least').isArray({
			min: 1,
		}),
		body('items.*.name', 'The item name is required').not().isEmpty(),
		body(
			'items.*.quantity',
			'The item quantity must be a number greater than or equal to 1'
		).isInt({ min: 1 }),
		body('items.*.category', 'The item category is required')
			.not()
			.isEmpty(),
		body('items.*.completed', 'The item completed state must be a boolean')
			.isBoolean()
			.optional({ nullable: true }),
		body('items.*.item', 'A valid item id is required').isMongoId(),
		checkError,
	],
	createCart
);

router.get('/', getCartByUser);

router.get(
	'/:id',
	[param('id', 'A valid cart id is required').isMongoId(), checkError],
	getCartById
);

router.put(
	'/:id',
	[
		body('name', 'The cart name is required').not().isEmpty(),
		body('user', 'A valid user id is required').isMongoId(),
		body('items', 'The item list must have one item at least').isArray({
			min: 1,
		}),
		body('items.*.name', 'The item name is required').not().isEmpty(),
		body(
			'items.*.quantity',
			'The item quantity must be a number greater than or equal to 1'
		).isInt({ min: 1 }),
		body('items.*.category', 'The item category is required')
			.not()
			.isEmpty(),
		body('items.*.completed', 'The item completed state must be a boolean')
			.isBoolean()
			.optional({ nullable: true }),
		body('items.*.item', 'A valid item id is required').isMongoId(),
		checkError,
	],
	updateCart
);

router.delete(
	'/:id',
	[param('id', 'A valid cart id is required').isMongoId(), checkError],
	deleteCart
);

router.delete(
	'/:id/complete',
	[param('id', 'A valid cart id is required').isMongoId(), checkError],
	completeCart
);

router.delete(
	'/:id/cancel',
	[param('id', 'A valid cart id is required').isMongoId(), checkError],
	cancelCart
);

export default router;
