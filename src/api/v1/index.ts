import express from 'express';

import meetingRoutes from './routes/meetingRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import queueRoutes from './routes/queueRoutes.js';

const router = express.Router();

router.use('/meetings', meetingRoutes);
router.use('/analysis', analysisRoutes);
router.use('/queue', queueRoutes);

export default router;