import { Request, Response } from 'express';
import { IUser } from '../models/User';
import Item from '../models/Item';
import Category from '../models/Category';

export const createItem = async (req: Request, res: Response) => {
	try {
		const item = new Item(req.body);
		await item.save();
		res.json({ success: true, msg: 'Item created', item });
	} catch (err) {
		console.log('Create item error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const getItems = async (req: Request, res: Response) => {
	const { _id: user } = req.user as IUser;
	try {
		const categories = await Category.find({ user });
		const items = await Item.find({ user });
		res.json({ success: true, items, categories, msg: 'Items retried' });
	} catch (err) {
		console.log('Read items error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const getItem = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const item = await Item.findById(id);
		if (!item) {
			return res.json({ success: false, msg: 'The item does not exist' });
		}
		res.json({ success: true, item, msg: 'Item retried' });
	} catch (err) {
		console.log('Read item error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const updateItem = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { _id: user } = req.user as IUser;

	const { user: _, _id, ...data } = req.body;

	try {
		const item = await Item.findOneAndUpdate(
			{
				_id: id,
				user,
			},
			data,
			{ new: true }
		);

		res.json({ success: true, msg: 'Item updated', item });
	} catch (err) {
		console.log('Update item error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const deleteItem = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { _id: user } = req.user as IUser;
	try {
		const item = await Item.findOneAndDelete({
			_id: id,
			user,
		});
		if (!item) {
			return res.status(404).json({
				success: false,
				msg: 'The item could not be deleted. Possibly does not exist or does not have sufficient permissions to perform this action.',
			});
		}
		res.json({ success: true, msg: 'Item deleted', item });
	} catch (err) {
		console.log('Delete item error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};
