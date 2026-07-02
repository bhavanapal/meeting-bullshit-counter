import express from 'express';
import { getAnalysis, getMeetingAnalysis } from '../controllers/analyze-Controller.js';

const router = express.Router();

router.get('/meeting/:meetingId', getMeetingAnalysis);
router.get('/:id', getAnalysis);

export default router;