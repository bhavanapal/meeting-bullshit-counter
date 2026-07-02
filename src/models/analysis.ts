import { model, Schema, type InferSchemaType } from 'mongoose';

const analysisSchema = new Schema(
  {
    meetingId: {
      type: Schema.Types.ObjectId,
      ref: 'Meeting',
      required: true,
      unique: true,
      index: true,
    },
    repetition_score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    filler_percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    clarity_score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    action_items: {
      type: [String],
      required: true,
      default: [],
    },
    efficiency_score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
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
