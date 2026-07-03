import z from 'zod';
import { createMeetingSchema } from '../api/v1/middlewares/validators/meeting-validator.js';
import { registry } from './openapi.js';

registry.registerPath({
  method: 'post',
  path: '/meetings',

  tags: ['Meetings'],

  summary: 'Create and analyze meeting transcript',

  request: {
    body: {
      content: {
        'application/json': {
          schema: createMeetingSchema,
        },
      },
    },
  },

  responses: {
    201: {
      description: 'Meeting created successfully',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/meetings',
  tags: ['Meetings'],
  summary: 'Get all meeting',
  responses: {
    200: {
      description: 'List of meeting',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/meetings/{id}',
  tags: ['Meetings'],
  summary: 'Get meeting by id',
  request: {
    params: z.object({
      id: z.string(),
    }),
  },

  responses: {
    200: {
      description: 'Meeting found',
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/meetings/{id}',
  tags: ['Meetings'],
  summary: 'Delete meeting',

  request: {
    params: z.object({
      id: z.string(),
    }),
  },

  responses: {
    200: {
      description: 'Meeting deleted',
    },
  },
});
