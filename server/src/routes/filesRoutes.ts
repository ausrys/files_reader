import { Router } from 'express';
import { getFiles } from '../controllers/filesController';
export const filesRouter = Router();

filesRouter.get('/all', getFiles);
