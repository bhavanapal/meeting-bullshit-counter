import z from 'zod';
import { registry } from './openapi.js';

registry.registerPath({
  method: 'get',
  path: '/analysis/{id}',
  tags: ['Analysis'],
  summary: 'Get Meeting analysis by analysis id',
  request: {
    params: z.object({
      id: z.string(),
    }),
  },

  responses: {
    200: {
      description: 'Analysis found',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/analysis/meeting/{meetingId}',
  tags: ['Analysis'],
  summary: 'Get analysis by meeting id',

  request: {
    params: z.object({
      meetingId: z.string(),
    }),
  },

  responses: {
    200: {
      description: 'Analysis found',
    },
  },
});
