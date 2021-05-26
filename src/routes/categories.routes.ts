import { Router } from 'express';
import { body } from 'express-validator';
import checkError from '../middlewares/checkError';
import {
	createCategory,
	getCategories,
} from '../controllers/categories.controller';

const router = Router();

router.post(
	'/',
	[
		body('category', 'Category is required').not().isEmpty(),
		body('lowercase', 'Lowercase category is required').not().isEmpty(),
		body('user', 'A valid user id is required').isMongoId(),
		checkError,
	],
	createCategory
);

router.get('/', getCategories);

export default router;
