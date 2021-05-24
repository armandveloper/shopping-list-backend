import { model, Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
	uid: string;
	email: string;
	password: string;
	hashPassword(password: string): Promise<void>;
	comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
	},
});

userSchema.methods.hashPassword = async function (password) {
	this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

export default model('User', userSchema);
