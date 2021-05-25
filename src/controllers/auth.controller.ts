import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { createToken } from '../helpers/jwt';

export const signup = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res
				.status(409)
				.json({ success: false, msg: 'The account already exists' });
		}
		const user = new User({ email });
		await user.hashPassword(password);
		await user.save();
		res.status(201).json({
			success: true,
			msg: 'User signup successfully',
			user,
		});
	} catch (err) {
		console.log('Signup error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const signin = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(401)
				.json({ success: false, msg: 'Invalid email or password' });
		}

		const isValidPassword = await user.comparePassword(password);

		if (!isValidPassword) {
			return res
				.status(401)
				.json({ success: false, msg: 'Invalid email or password' });
		}

		const token = createToken(user);

		res.json({
			success: true,
			msg: 'Login successfully',
			user,
			token,
		});
	} catch (err) {
		console.log('Signin error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const renewToken = async (req: Request, res: Response) => {
	try {
		const userToken = req.user as IUser;
		const token = await createToken(userToken);
		const user = await User.findById(userToken._id);
		return res.json({
			success: true,
			msg: 'Token renewed',
			user,
			token,
		});
	} catch (err) {
		console.log('Token renewal error:', err);
		res.status(500).json({ success: false, msg: 'Error renewing token' });
	}
};
