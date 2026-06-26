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

export const getUserPredictions = async (
  userId: string,
  page: number = 1,
  search: string = ""
) => {
  await connectDB();

  const limit = 5;
  const skip = (page - 1) * limit;

  const query: any = { userId };

  if (search) {
    query.$or = [
      { story: { $regex: search, $options: "i" } },
      { "result.genre": { $regex: search, $options: "i" } },
      { "result.mainPrediction": { $regex: search, $options: "i" } },
    ];
  }

  const [predictions, total] = await Promise.all([
    PredictionModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    PredictionModel.countDocuments(query),
  ]);

  return {
    predictions,
    total,
    pages: Math.ceil(total / limit),
    page,
  };
};