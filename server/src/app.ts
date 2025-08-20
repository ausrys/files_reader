import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';

dotenv.config();

// Init express ap
const app = express();

// Middleware
app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173'],
    }),
);
app.use(express.json());
// Routes
app.use('/api/v1', router);

export default app;
