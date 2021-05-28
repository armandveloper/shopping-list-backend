import { model, Document, Schema } from 'mongoose';

export interface ICartItem {
	name: string;
	quantity: number;
	category: string;
	completed: boolean;
	item: string;
}

export interface ICart extends Document {
	name: string;
	user: string;
	Items: ICartItem[];
}

const cartSchema = new Schema<ICart>({
	name: {
		type: String,
		required: true,
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

export default model('Cart', cartSchema);
