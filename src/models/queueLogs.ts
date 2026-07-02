import { model, Schema, type InferSchemaType } from 'mongoose';

const queuelogSchema = new Schema(
  {
    logId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      required: true,
      index: true,
    },
    error: {
      type: String,
      default: null,
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
