import express from 'express';
import { validate } from '../middlewares/validate-middleware.js';
import { createMeetingSchema } from '../middlewares/validators/meeting-validator.js';
import {
  createMeeting,
  deleteMeeting,
  getAllMeetings,
  getMeeting,
} from '../controllers/meetingController.js';

const router = express.Router();

router.post('/', validate(createMeetingSchema), createMeeting);
router.get('/', getAllMeetings);
router.get('/:id', getMeeting);
router.delete('/:id', deleteMeeting);

export default router;
