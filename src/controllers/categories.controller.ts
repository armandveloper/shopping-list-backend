import { Request, Response } from 'express';
import Category, { ICategory } from '../models/Category';
import User, { IUser } from '../models/User';

const userExists = (userId: string): Promise<IUser> => {
	return User.findById(userId);
};

const categoryExists = (
	category: string,
	userId: string
): Promise<ICategory> => {
	return Category.findOne({ user: userId, lowercase: category });
};

export const createCategory = async (req: Request, res: Response) => {
	const { user, lowercase } = req.body;
	try {
		const userDB = await userExists(user);
		if (!userDB) {
			return res
				.status(400)
				.json({ success: false, msg: 'Invalid user id' });
		}
		const categoryDB = await categoryExists(lowercase, user);
		if (categoryDB) {
			return res
				.status(409)
				.json({ success: false, msg: 'The category already exists' });
		}
		const newCategory = new Category(req.body);
		await newCategory.save();
		res.json({
			success: true,
			msg: 'Category created',
			category: newCategory,
		});
	} catch (err) {
		console.log('Create category error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const getCategories = async (req: Request, res: Response) => {
	const { _id: user } = req.user as IUser;
	try {
		const categories = await Category.find({ user });
		res.json({ success: true, msg: 'Categories retried', categories });
	} catch (err) {
		console.log('Get categories error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};
