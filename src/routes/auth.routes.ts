import { Router } from 'express';
import { body } from 'express-validator';
import checkError from '../middlewares/checkError';
import isAuthenticated from '../middlewares/isAuthenticated';
import { renewToken, signin, signup } from '../controllers/auth.controller';

const router = Router();

router.post(
	'/signup',
	[
		body('email', 'A valid email is required').isEmail(),
		body('password', 'Password must be at least 8 characters').isLength({
			min: 8,
		}),
		checkError,
	],
	signup
);

router.post(
	'/signin',
	[
		body('email', 'A valid email is required').isEmail(),
		body('password', 'Password is required').isLength({
			min: 8,
		}),
		checkError,
	],
	signin
);

router.get('/renewToken', isAuthenticated, renewToken);

export default router;
