import { Request, Response } from 'express';
import Cart from '../models/Cart';
import History from '../models/History';
import { IUser } from '../models/User';

export const createCart = async (req: Request, res: Response) => {
	try {
		const cart = new Cart(req.body);
		await cart.save();
		res.json({ success: true, msg: 'Cart created', cart });
	} catch (err) {
		console.log('Create cart error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const getCartByUser = async (req: Request, res: Response) => {
	const { _id: user } = req.user as IUser;
	try {
		const cart = await Cart.findOne({ user });
		if (!cart) {
			return res.status(404).json({
				success: false,
				msg: 'The cart could not be retried. Possibly does not exist or does not have sufficient permissions to perform this action.',
			});
		}
		res.json({ success: true, msg: 'Cart retried', cart });
	} catch (err) {
		console.log('Get cart error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const getCartById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { _id: user } = req.user as IUser;
	try {
		const cart = await Cart.findOne({ _id: id, user });
		if (!cart) {
			return res.status(404).json({
				success: false,
				msg: 'The cart could not be retried. Possibly does not exist or does not have sufficient permissions to perform this action.',
			});
		}
		res.json({ success: true, msg: 'Cart retried', cart });
	} catch (err) {
		console.log('Get cart error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const updateCart = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { user, _id, ...data } = req.body;
	try {
		const cart = await Cart.findOneAndUpdate({ _id: id, user }, data, {
			new: true,
		});
		if (!cart) {
			return res.status(404).json({
				success: false,
				msg: 'The cart could not be updated. Possibly does not exist or does not have sufficient permissions to perform this action.',
			});
		}
		res.json({ success: true, msg: 'Cart updated', cart });
	} catch (err) {
		console.log('Update cart error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const deleteCart = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { _id: user } = req.user as IUser;
	try {
		const cart = await Cart.findOneAndDelete({ _id: id, user });
		console.log(cart);
		if (!cart) {
			return res.status(404).json({
				success: false,
				msg: 'The cart could not be deleted. Possibly does not exist or does not have sufficient permissions to perform this action.',
			});
		}
		res.json({ success: true, msg: 'Cart deleted' });
	} catch (err) {
		console.log('Delete cart error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const completeCart = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { _id: user } = req.user as IUser;
	try {
		const cart = await Cart.findOneAndDelete({ _id: id, user });
		if (!cart) {
			return res.status(404).json({
				success: false,
				msg: 'The cart could not be mark as completed. Possibly does not exist or does not have sufficient permissions to perform this action.',
			});
		}
		const { _id, __v, ...data } = cart._doc;
		const history = new History(data);
		await history.save();
		res.json({ success: true, msg: 'Cart completed', history });
	} catch (err) {
		console.log('Complete cart error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const cancelCart = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { _id: user } = req.user as IUser;
	try {
		const cart = await Cart.findOneAndDelete({ _id: id, user });
		if (!cart) {
			return res.status(404).json({
				success: false,
				msg: 'The cart could not be cancelled. Possibly does not exist or does not have sufficient permissions to perform this action.',
			});
		}
		const { _id, __v, ...data } = cart._doc;
		const history = new History({
			...data,
			completed: false,
			cancelled: true,
		});
		await history.save();
		res.json({ success: true, msg: 'Cart cancelled', history });
	} catch (err) {
		console.log('Cancel cart error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};
