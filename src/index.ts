import dotenv from 'dotenv';
import config from './config';
dotenv.config();
import app from './server';

app.listen(config.PORT, () => {
	console.log('Server is running on port:', config.PORT);
});
