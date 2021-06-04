import { Request, Response } from 'express';
import mongoose from 'mongoose';
import History from '../models/History';

// Devuelve los 3 artículos y categoías más comprados o frecuentes
// así como el total de items que conforman el historial, junto con
// la cantidad de artículos comprados en cada mes del año
export const getUserStatistics = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = mongoose.Types.ObjectId(id);
	try {
		const totalPromise = History.aggregate([
			{ $match: { user } },
			{ $project: { _id: 0, items: 1 } },
			{ $unwind: '$items' },
			{
				$group: {
					_id: '',
					count: { $sum: '$items.quantity' },
				},
			},
		]);
		const topItemsPromise = History.aggregate([
			{ $match: { user } },
			{ $project: { _id: 0, items: 1 } },
			{ $unwind: '$items' },
			{
				$group: {
					_id: '$items.name',
					count: { $sum: '$items.quantity' },
				},
			},
			{ $sort: { count: -1, _id: 1 } },
			{ $limit: 3 },
		]);

		const topCategoriesPromise = History.aggregate([
			{ $match: { user } },
			{ $project: { _id: 0, items: 1 } },
			{ $unwind: '$items' },
			{
				$group: {
					_id: '$items.category',
					count: { $sum: 1 },
				},
			},
			{ $sort: { count: -1, _id: 1 } },
			{ $limit: 3 },
		]);

		const [total, topItems, topCategories] = await Promise.all([
			totalPromise,
			topItemsPromise,
			topCategoriesPromise,
		]);

		res.json({ success: true, total, topItems, topCategories });
	} catch (err) {
		console.log('Get user statistics error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};
