import { Request, Response } from 'express';
import History from '../models/History';
import { IUser } from '../models/User';

interface PaginationParams {
	offset: number;
	limit: number;
}

export const getUserHistory = async (
	req: Request<{ id: string }, {}, {}, PaginationParams>,
	res: Response
) => {
	const { id } = req.params;
	const { limit = 5, offset = 0 } = req.query;
	try {
		const countPromise = History.find({ user: id }).count();
		const historyPromise = await History.find({ user: id }, null, {
			skip: offset,
			limit,
			sort: {
				createdAt: -1,
			},
		});
		const [total, history] = await Promise.all([
			countPromise,
			historyPromise,
		]);
		return res.json({
			success: true,
			msg: 'User history retried',
			total,
			history,
		});
	} catch (err) {
		console.log('Get user history error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const getUserHistoryEntry = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { _id: user } = req.user as IUser;

	try {
		const entry = await History.findOne({ _id: id, user });
		if (!entry) {
			return res.status(404).json({
				success: false,
				msg: 'The history entry could not be retried. Possibly does not exist or does not have sufficient permissions to perform this action.',
			});
		}
		res.json({ success: true, msg: 'History entry retried', entry });
	} catch (err) {
		console.log('Get user history entry error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};

export const deleteHistoryEntry = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { _id: user } = req.user as IUser;
	try {
		const history = await History.findOneAndDelete({ _id: id, user });
		if (!history) {
			return res.status(404).json({
				success: false,
				msg: 'The history entry could not be deleted. Possibly does not exist or does not have sufficient permissions to perform this action.',
			});
		}
		res.json({ success: true, msg: 'History entry deleted', history });
	} catch (err) {
		console.log('Deletet history entry error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something went wrong. Try later please',
		});
	}
};
