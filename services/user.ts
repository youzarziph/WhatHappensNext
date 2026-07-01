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
  export const getDashboardStats = async (userId: string) => {
  await connectDB();

  const predictions = await PredictionModel.find({ userId }).lean();

  const total = predictions.length;

  if (total === 0) {
    return {
      total: 0,
      avgConfidence: 0,
      topGenre: "N/A",
      genreBreakdown: [],
      predictionsOverTime: [],
    };
  }

  const avgConfidence = Math.round(
    predictions.reduce((sum, p) => sum + p.result.confidence, 0) / total
  );

  const genreCounts: Record<string, number> = {};
  predictions.forEach((p) => {
    const g = p.result.genre || "Unknown";
    genreCounts[g] = (genreCounts[g] || 0) + 1;
  });

  const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0][0];

  const genreBreakdown = Object.entries(genreCounts).map(([genre, count]) => ({
    genre,
    count,
  }));

  const timeCounts: Record<string, number> = {};
  predictions.forEach((p) => {
    const date = new Date(p.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    timeCounts[date] = (timeCounts[date] || 0) + 1;
  });

  const predictionsOverTime = Object.entries(timeCounts).map(([date, count]) => ({
    date,
    count,
  }));

  return {
    total,
    avgConfidence,
    topGenre,
    genreBreakdown,
    predictionsOverTime,
  };
};