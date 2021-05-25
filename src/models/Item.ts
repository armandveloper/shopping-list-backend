import { model, Document, Schema } from 'mongoose';

export interface IItem extends Document {
	name: string;
	note?: string;
	image?: string;
	category?: string;
	user: string;
}

const itemSchema = new Schema<IItem>({
	name: {
		type: String,
		required: true,
	},
	note: {
		type: String,
	},
	image: {
		type: String,
	},
	category: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

export default model('Item', itemSchema);
