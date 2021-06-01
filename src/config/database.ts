import mongoose from 'mongoose';
import config from './';

const connectDB = async () => {
	try {
		await mongoose.connect(config.DB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			autoIndex: false,
		});
		console.log('Mongodb Connection established');
	} catch (err) {
		console.log('Mongodb connection error:', err);
		process.exit(1);
	}
};

connectDB();
