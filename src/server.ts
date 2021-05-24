import express from 'express';
import cors from 'cors';
import passport from 'passport';
import passportConfig from './config/passport';
import indexRoutes from './routes/index.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
passport.use(passportConfig);
app.use('/api', indexRoutes);

export default app;
