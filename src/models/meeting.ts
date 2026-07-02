import { model, Schema, type InferSchemaType } from 'mongoose';

export const MEETING_STATUS = {
  QUEUED: 'queued',
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETE: 'completed',
  FAILED: 'failed',
} as const;

const meetingSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(MEETING_STATUS),
      default: MEETING_STATUS.QUEUED,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type Meeting = InferSchemaType<typeof meetingSchema>;
const MeetingModel = model<Meeting>('Meeting', meetingSchema);
export default MeetingModel;