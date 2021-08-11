import { Request, Response } from 'express';
import mongoose from 'mongoose';
import History from '../models/History';

// Devuelve los 3 artículos y categoías más comprados o frecuentes
// así como el total de items que conforman el historial, junto con
// la cantidad de artículos comprados en cada mes del año
export const getUserStatistics = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = mongoose.Types.ObjectId(id);
	const monthlySummary: { _id: number; count: number }[] = [
		{ _id: 1, count: 0 },
		{ _id: 2, count: 0 },
		{ _id: 3, count: 0 },
		{ _id: 4, count: 0 },
		{ _id: 5, count: 0 },
		{ _id: 6, count: 0 },
		{ _id: 7, count: 0 },
		{ _id: 8, count: 0 },
		{ _id: 9, count: 0 },
		{ _id: 10, count: 0 },
		{ _id: 11, count: 0 },
		{ _id: 12, count: 0 },
	];

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
					count: {
						$sum: {
							$multiply: ['$items.quantity', 1],
						},
					},
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
					count: {
						$multiply: [1, '$items.quantity'],
					},
				},
			},
			{ $sort: { count: -1, _id: 1 } },
			{ $limit: 3 },
		]);

		const itemsByMonthPromise = History.aggregate([
			{ $match: { user } },
			{ $project: { _id: 0, items: 1, month: { $month: '$createdAt' } } },
			{ $unwind: '$items' },
			{
				$group: {
					_id: '$month',
					count: { $sum: '$items.quantity' },
				},
			},
		]);

		const [total, topItems, topCategories, itemsByMonth] =
			await Promise.all([
				totalPromise,
				topItemsPromise,
				topCategoriesPromise,
				itemsByMonthPromise,
			]);

		// Coloca los meses que vengan de la bd
		itemsByMonth.forEach((item) => {
			monthlySummary[item._id - 1] = item;
		});

		res.json({
			success: true,
			msg: 'User Statistics Retried',
			total,
			topItems,
			topCategories,
			monthlySummary,
		});
	} catch (err) {
		console.log('Get user statistics error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};
