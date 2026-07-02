import { model, Schema, type InferSchemaType } from 'mongoose';

const queuelogSchema = new Schema(
  {
    meetingId: {
      type: Schema.Types.ObjectId,
      ref: 'Meeting',
      index: true,
    },
    logId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['queued', 'pending', 'processing', 'completed', 'failed'],
      default: 'queued',
      required: true,
      index: true,
    },
    error: {
      type: String,
      required: false,
      default: undefined,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type QueueLog = InferSchemaType<typeof queuelogSchema>;
const QueueLogModel = model<QueueLog>('QueueLog', queuelogSchema);
export default QueueLogModel;
