import { OpenAPIRegistry, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createMeetingSchema } from '../api/v1/middlewares/validators/meeting-validator.js';
import z from 'zod';

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

/**
 * Register schemas
 */
registry.register('CreateMeeting', createMeetingSchema);
