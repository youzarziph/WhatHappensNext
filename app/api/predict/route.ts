import { NextRequest, NextResponse } from "next/server";
import { generatePrediction } from "@/services/prediction";
import { savePrediction } from "@/services/user";
import { auth } from "@/auth";
import { APIResponse, PredictionResult } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { story } = body;

    if (!story || typeof story !== "string") {
      return NextResponse.json<APIResponse<null>>(
        { error: "Story text is required." },
        { status: 400 }
      );
    }

    const prediction = await generatePrediction(story);

    // Save to DB if user is logged in
    const session = await auth();
    if (session?.user) {
      await savePrediction((session.user as any).id, story, prediction);
    }

    return NextResponse.json<APIResponse<PredictionResult>>({
      data: prediction,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";
    return NextResponse.json<APIResponse<null>>(
      { error: message },
      { status: 500 }
    );
  }
}