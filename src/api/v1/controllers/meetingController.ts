import type { Request, Response } from 'express';
import MeetingModel from '../../../models/meeting.js';
import { analyzeMeeting } from '../../../services/analysisService.js';
import AnalysisModel from '../../../models/analysis.js';
import QueueLogModel from '../../../models/queueLogs.js';
import mongoose from 'mongoose';

interface MeetingParamas {
  meetingId: string;
}

export const createMeeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({
        success: false,
        message: 'Meeting transcript is required',
      });
      return;
    }

    const meeting = await MeetingModel.create({
      text,
    });

    const logId = `analysis-${meeting._id.toString()}`;

    await QueueLogModel.create({
      meetingId: meeting._id,
      logId,
      status: 'processing',
    });

    const analysis = await analyzeMeeting(meeting._id.toString(), logId);

    res.status(201).json({
      success: true,
      message: 'Meeting analyzed successfully',
      data: {
        meetingId: meeting._id,
        logId,
        analysis,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to crate meeting',
    });
  }
};

export const getMeeting = async (req: Request<MeetingParamas>, res: Response): Promise<void> => {
  try {
    const { meetingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(meetingId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid meeting id',
      });
      return;
    }
    const meeting = await MeetingModel.findById(meetingId);

    if (!meeting) {
      res.status(404).json({
        success: false,
        message: 'Meeting not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch meeting',
    });
  }
};

export const getAllMeetings = async (req: Request, res: Response): Promise<void> => {
  try {
    const meetings = await MeetingModel.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: meetings.length,
      data: meetings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch meeting',
    });
  }
};

export const deleteMeeting = async (req: Request<MeetingParamas>, res: Response): Promise<void> => {
  try {
    const { meetingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(meetingId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid meeting id',
      });
      return;
    }
    const meeting = await MeetingModel.findByIdAndDelete(meetingId);

    if (!meeting) {
      res.status(404).json({
        success: false,
        message: 'Meeting not found',
      });
      return;
    }

    await Promise.all([
      AnalysisModel.deleteOne({
        meetingId: meeting._id,
      }),
      await QueueLogModel.deleteMany({
        meetingId: meeting._id,
      }),
    ]);

    res.status(200).json({
      success: true,
      message: 'Meeting deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete meeting',
    });
  }
};
