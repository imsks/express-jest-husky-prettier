import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import BodyParser from 'body-parser';
import userAuthRouter from './routes/user/auth';
import userProfileRouter from './routes/user/profile';
import userProfileDashboard from './routes/user/dashboard';
import userStocksRouter from './routes/user/stocks';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(morgan('combined'));

// Routes
app.use('/api/v1/user/auth', userAuthRouter);
app.use('/api/v1/user/profile', userProfileRouter);
app.use('/api/v1/user/dashboard', userProfileDashboard);
app.use('/api/v1/user/stock', userStocksRouter);

export default app;
