import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import BodyParser from 'body-parser';
import indexRouter from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(morgan('combined'));

// Routes
app.use('/api/v1/', indexRouter);

// For Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
