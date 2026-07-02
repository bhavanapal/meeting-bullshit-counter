import express from 'express';
import { getAllJobs, getJobStatus } from '../controllers/queueController.js';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:logId', getJobStatus);

export default router;