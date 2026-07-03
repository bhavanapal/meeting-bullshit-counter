import z from 'zod';
import { registry } from './openapi.js';

export const MeetingSchema = z
  .object({
    _id: z.string(),
    text: z.string(),
    status: z.enum(['queued', 'pending', 'processing', 'completed', 'failed']),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .openapi('Meeting');

export const AnalysisSchema = z
  .object({
    meetingId: z.string(),
    repetition_score: z.number(),
    filler_percentage: z.number(),
    clarity_score: z.number(),
    action_items: z.array(z.string()),
    efficiency_score: z.number(),
    verdict: z.string(),
  })
  .openapi('Analysis');

export const QueueLogSchema = z
  .object({
    meetingId: z.string().openapi({
      example: '6875d3a1d7c4e4d1b7e0f123',
      description: 'Associated meeting id',
    }),

    logId: z.string().openapi({
      example: 'analysis-6875d3a1d7c4e4d1b7e0f123',
    }),
    status: z.enum(['queued', 'pending', 'processing', 'completed', 'failed']).openapi({
      example: 'completed',
    }),
    error: z.string().nullable().optional().openapi({ example: null }),
  })
  .openapi('QueueLog');

export const ErrorResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
  })
  .openapi('ErrorResponse');

registry.register('Meeting', MeetingSchema);
registry.register('Analysis', AnalysisSchema);
registry.register('QueueLog', QueueLogSchema);
registry.register('ErrorResponse', ErrorResponseSchema);
