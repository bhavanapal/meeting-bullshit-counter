import { model, Schema, type InferSchemaType } from 'mongoose';

const meetingSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: 'Processing',
      enum: ['Processing', 'Complete', 'Failed'],
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
