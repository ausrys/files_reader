import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';
import { notFoundHandler } from './middleware/expressMiddleware';

dotenv.config();

// Init express ap
const app = express();

// Middleware

app.use(express.json());
// Routes
app.use('/api/v1', router);
app.use(notFoundHandler); // Not found page handler
export default app;
