import { Router } from 'express';
import { filesRouter } from './filesRoutes';
// Main router
const router = Router();

router.use('/files', filesRouter);

export default router;
