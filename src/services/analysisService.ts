import mongoose from 'mongoose';
import { calculateActionItems } from './metrics/actionItems.js';
import { calculateEfficiency } from './metrics/efficiency.js';
import { calculateFillers } from './metrics/filler.js';
import { calculateRepetition } from './metrics/repetition.js';
import { getVerdict } from './metrics/Verdict.js';
import MeetingModel, { MEETING_STATUS } from '../models/meeting.js';
import AnalysisModel from '../models/analysis.js';
import QueueLogModel from '../models/queueLogs.js';
import { getRequestId } from '../lib/request-context.js';
import { calculateClarity } from './metrics/clarity.js';

export async function analyzeMeeting(meetingId: string, logId?: string) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    console.log(`[${getRequestId()}] analyzing meeting ${meetingId}`);

    const meeting = await MeetingModel.findById(meetingId).session(session);

    if (!meeting) {
      throw new Error('Meeting not found');
    }

    const transcript = meeting.text;
    const repetitionScore = calculateRepetition(transcript);

    const fillerPercentage = calculateFillers(transcript);

    const clarityScore = calculateClarity(transcript);

    const actionItems = calculateActionItems(transcript);

    const efficiencyScore = calculateEfficiency(
      repetitionScore,
      fillerPercentage,
      clarityScore,
      actionItems.length,
    );

    const verdict = getVerdict(efficiencyScore);

    console.log({
      repetitionScore,
      fillerPercentage,
      clarityScore,
      actionItems,
      efficiencyScore,
      verdict,
    });

    // save analysis save it to mongoDB
    const [analysis] = await AnalysisModel.create(
      [
        {
          meetingId,
          repetition_score: repetitionScore,
          filler_percentage: fillerPercentage,
          clarity_score: clarityScore,
          action_items: actionItems,
          efficiency_score: efficiencyScore,
          verdict,
        },
      ],
      { session },
    );

    // update Meeting status
    await MeetingModel.findByIdAndUpdate(
      meetingId,
      { status: MEETING_STATUS.COMPLETE },
      { session },
    );

    // update Queue Log
    if (logId) {
      await QueueLogModel.findOneAndUpdate(
        { logId },
        {
          status: 'completed',
          error: null,
        },
        { session },
      );
    }

    await session.commitTransaction();
    return analysis;
  } catch (err: unknown) {
    await session.abortTransaction();

    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';

    await MeetingModel.findByIdAndUpdate(meetingId, {
      status: MEETING_STATUS.FAILED,
    });

    if (logId) {
      await QueueLogModel.findOneAndUpdate(
        { logId },
        {
          status: 'failed',
          error: errorMessage,
        },
      );
    }

    throw err;
  } finally {
    session.endSession();
  }
}
