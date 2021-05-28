import { model, Schema } from 'mongoose';
import { ICart } from './Cart';

export interface IHistory extends ICart {
	completed: boolean;
	cancelled: boolean;
}

const historySchema = new Schema<IHistory>({
	name: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: true,
	},
	cancelled: {
		type: Boolean,
		default: false,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	items: [
		{
			name: {
				type: String,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
			category: {
				type: String,
				required: true,
			},
			completed: {
				type: Boolean,
				default: false,
			},
			item: {
				type: Schema.Types.ObjectId,
				ref: 'Item',
			},
		},
	],
});

export default model('History', historySchema);
