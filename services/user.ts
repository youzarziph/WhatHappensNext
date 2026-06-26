import { connectDB } from "@/lib/mongodb";
import PredictionModel from "@/models/Prediction";
import { PredictionResult } from "@/types";

export const savePrediction = async (
  userId: string,
  story: string,
  result: PredictionResult
) => {
  await connectDB();
  await PredictionModel.create({ userId, story, result });
};

export const getUserPredictions = async (userId: string) => {
  await connectDB();
  const predictions = await PredictionModel.find({ userId })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();
  return predictions;
};