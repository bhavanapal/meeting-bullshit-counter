import type { Request, Response } from 'express';
import QueueLogModel from '../../../models/queueLogs.js';

interface JobParams {
  logId: string;
}

export const getJobStatus = async (req: Request<JobParams>, res: Response): Promise<void> => {
  try {
    const job = await QueueLogModel.findOne({
      logId: req.params.logId,
    });

    if (!job) {
      res.status(404).json({
        success: false,
        message: 'Job not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getAllJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await QueueLogModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
