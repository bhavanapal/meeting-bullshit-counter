import type { Request, Response } from 'express';
import AnalysisModel from '../../../models/analysis.js';
import mongoose from 'mongoose';

interface AnalysisParams {
  id: string;
}

interface MeetingParamas {
  meetingId: string;
}

export const getAnalysis = async (req: Request<AnalysisParams>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid analysis id',
      });
      return;
    }
    const analysis = await AnalysisModel.findById(id);

    if (!analysis) {
      res.status(404).json({ success: false, message: 'Analysis not found' });
      return;
    }

    res.status(200).json({ success: true, data: analysis });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch analysis',
    });
  }
};

export const getMeetingAnalysis = async (
  req: Request<MeetingParamas>,
  res: Response,
): Promise<void> => {
  try {
    const { meetingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(meetingId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid meeting id',
      });
      return;
    }

    const analysis = await AnalysisModel.findOne({ meetingId });

    if (!analysis) {
      res.status(404).json({ success: false, message: 'Analysis not found for this meeting' });
      return;
    }

    res.status(200).json({ success: true, data: analysis });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch meeting analysis',
    });
  }
};
