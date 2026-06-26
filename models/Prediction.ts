import mongoose, { Schema, Document } from "mongoose";

export interface IPrediction extends Document {
  userId: mongoose.Types.ObjectId;
  story: string;
  result: {
    mainPrediction: string;
    confidence: number;
    characters: { name: string; survivalChance: number }[];
    alternativeTimeline: string;
    genre: string;
  };
  createdAt: Date;
}

const PredictionSchema = new Schema<IPrediction>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  story: { type: String, required: true },
  result: {
    mainPrediction: String,
    confidence: Number,
    characters: [{ name: String, survivalChance: Number }],
    alternativeTimeline: String,
    genre: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Prediction ||
  mongoose.model<IPrediction>("Prediction", PredictionSchema);