export interface Character {
  name: string;
  survivalChance: number;
}

export interface PredictionResult {
  mainPrediction: string;
  confidence: number;
  characters: Character[];
  alternativeTimeline: string;
  genre: string;
}

export interface PredictionRequest {
  story: string;
}

export interface APIResponse<T> {
  data?: T;
  error?: string;
}
