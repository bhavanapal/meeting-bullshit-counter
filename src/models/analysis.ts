import { model, Schema, type InferSchemaType } from 'mongoose';

const analysisSchema = new Schema(
  {
    meetingId: {
      type: Schema.Types.ObjectId,
      ref: 'Meeting',
      required: true,
    },
    repetition_score: {
      type: Number,
      required: true,
    },
    filler_percentage: {
      type: Number,
      required: true,
    },
    action_items: {
      type: Number,
      required: true,
    },
    efficiency_score: {
      type: Number,
      required: true,
    },
    verdict: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type Analysis = InferSchemaType<typeof analysisSchema>;
const AnalysisModel = model<Analysis>('Analysis', analysisSchema);
export default AnalysisModel;
