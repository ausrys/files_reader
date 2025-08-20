import { Router } from 'express';
import { downloadState, getFiles, rescanFiles } from '../controllers/filesController';
export const filesRouter = Router();

filesRouter.get('/list', getFiles);
filesRouter.get('/scan', rescanFiles);
filesRouter.get('/download-state', downloadState);
