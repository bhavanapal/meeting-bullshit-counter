import mongoose from 'mongoose';
import { describe, expect, it, vi } from 'vitest';
import AnalysisModel from '../../src/models/analysis.js';
import MeetingModel from '../../src/models/meeting.js';
import QueueLogModel from '../../src/models/queueLogs.js';
import { analyzeMeeting } from '../../src/services/analysisService.js';

describe('analyzeMeeting', () => {
  it('should analyze meeting successfully', async () => {
    const fakeMeeting = {
      _id: '1',
      text: 'We should circle back. um I think this is okay.',
      status: 'queued',
    };

    const fakeAnalysis = {
      meetingId: '1',
      repetition_score: 20,
      filler_percentage: 10,
      clarity_score: 80,
      action_items: ['assign task'],
      efficiency_score: 75,
      verdict: 'Moderately productive',
    };

    const mockSession = {
      startTransaction: vi.fn(),
      commitTransaction: vi.fn(),
      abortTransaction: vi.fn(),
      endSession: vi.fn(),
    };

    vi.spyOn(mongoose, 'startSession').mockResolvedValue(mockSession as never);

    vi.spyOn(MeetingModel, 'findById').mockReturnValue({
      session: vi.fn().mockResolvedValue(fakeMeeting),
    } as never);

    vi.spyOn(AnalysisModel, 'create').mockResolvedValue([fakeAnalysis] as never);

    vi.spyOn(MeetingModel, 'findByIdAndUpdate').mockResolvedValue(null as never);

    vi.spyOn(QueueLogModel, 'findOneAndUpdate').mockResolvedValue(null as never);

    const result = await analyzeMeeting('1');

    expect(result).toBeDefined();
    expect(result?.efficiency_score).toBeDefined();
  });
});
