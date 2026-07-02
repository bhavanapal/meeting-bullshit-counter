import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const createMeetingSchema = z
  .object({
    text: z
      .string()
      .trim()
      .min(10, 'Meeting text must be at least 10 characters')
      .max(50000, 'Meeting text must not exceed 50000 characters')
      .openapi({
        example:
          'We should circle back on this.Basically, the main issue is latency.We should circle back next week.Actually, I think we already discussed this.',
        description: 'Meeting transcript text',
      }),
  })
  .openapi('CreateMeetingRequest');

export type CreateMeetingInput = z.infer<typeof createMeetingSchema>;
