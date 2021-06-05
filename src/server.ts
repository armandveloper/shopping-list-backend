import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import config from './config';
import passportConfig from './config/passport';
import indexRoutes from './routes/index.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(
	cors({
		origin: config.CLIENT_URL,
	})
);
app.use(passport.initialize());
passport.use(passportConfig);
app.use('/api', indexRoutes);

export default app;
