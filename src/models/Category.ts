import { model, Document, Schema } from 'mongoose';

export interface ICategory extends Document {
	category: string;
	lowercase: string;
	user: string;
}

const categorySchema = new Schema<ICategory>({
	category: {
		type: String,
		required: true,
	},
	lowercase: {
		type: String,
		required: true,
		lowercase: true,
		index: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

export default model('Category', categorySchema);
