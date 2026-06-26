import { geminiModel } from "@/lib/gemini";
import { PredictionResult } from "@/types";

const buildPrompt = (story: string): string => `
You are a story analyst AI. Analyze the following story excerpt and respond ONLY with a valid JSON object — no markdown, no backticks, no explanation.

Story:
"""
${story}
"""

Respond with this exact JSON structure:
{
  "mainPrediction": "A 2-3 sentence prediction of what happens next",
  "confidence": 78,
  "characters": [
    { "name": "Character Name", "survivalChance": 85 }
  ],
  "alternativeTimeline": "A 2-3 sentence alternative outcome where things go differently",
  "genre": "detected genre (e.g. Anime, Fantasy, Thriller)"
}

Rules:
- confidence is a number between 40 and 95
- survivalChance is a number between 10 and 99
- Extract up to 4 characters maximum
- Only include characters explicitly named in the story
- Return pure JSON only
`;

export const generatePrediction = async (
  story: string
): Promise<PredictionResult> => {
  if (!story || story.trim().length < 20) {
    throw new Error("Story is too short. Give us more to work with.");
  }

  if (story.trim().length > 3000) {
    throw new Error("Story is too long. Keep it under 3000 characters.");
  }

  const prompt = buildPrompt(story.trim());
  const result = await geminiModel.generateContent(prompt);
  const raw = result.response.text().trim();

  let parsed: PredictionResult;

  try {
    parsed = JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("AI returned an unexpected format. Try again.");
    parsed = JSON.parse(match[0]);
  }

  return parsed;
};
