import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import { registry } from './openapi.js';

import './schemas.js';
import './meeting.docs.js';
import './analysis.docs.js';
import './queue.docs.js';

export function generateOpenAPIDocument() {
  const generator = new OpenApiGeneratorV31(registry.definitions);

  return generator.generateDocument({
    openapi: '3.1.0',
    info: {
      title: 'Meeting Bullshit Counter API',
      version: '1.0.0',
      description: 'Analyze meeting transcript and calculate productivity metrics.',
    },

    tags: [
      {
        name: 'Meetings',
        description: 'Meeting management',
      },
      {
        name: 'Analysis',
        description: 'Meeting analysis',
      },
      {
        name: 'Queue',
        description: 'Job queue tracking',
      },
    ],

    servers: [
      {
        url: process.env.API_URL ?? 'http://localhost:8000/api/v1',
      },
    ],
  });
}
