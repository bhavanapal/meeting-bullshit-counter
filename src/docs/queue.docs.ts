import z from 'zod';
import { registry } from './openapi.js';

registry.registerPath({
  method: 'get',
  path: '/queue',
  tags: ['Queue'],
  summary: 'Get all queue jobs',

  description: 'Returns all queue log records ordered by creation time.',

  responses: {
    200: {
      description: 'Queue logs retrieved successfully',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/queue/{logId}',
  tags: ['Queue'],
  summary: 'Get queue job status',
  description: 'Returns the processing status of a specific analysis job.',
  request: {
    params: z.object({
      logId: z.string().openapi({
        example: 'analysis-6875d3a1d7c4e4d1b7e0f123',
      }),
    }),
  },

  responses: {
    200: {
      description: 'Queue job found',
    },

    404: {
      description: 'Job not found',
    },
  },
});
