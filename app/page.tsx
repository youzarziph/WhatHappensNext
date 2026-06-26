"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import PredictionForm from "@/components/prediction/PredictionForm";
import PredictionResult from "@/components/prediction/PredictionResult";
import { PredictionResult as TPredictionResult } from "@/types";

export default function Home() {
  const [result, setResult] = useState<TPredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        {!result && (
          <div className="mb-10 text-center flex flex-col gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              What Happens Next?
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-md mx-auto">
              Paste any story, anime scene, book chapter, or movie summary.
              Our AI predicts what comes next.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-4 py-20">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-neutral-500">Analyzing your story...</p>
          </div>
        )}

        {!loading && !result && (
          <PredictionForm onResult={setResult} onLoading={setLoading} />
        )}

        {!loading && result && (
          <PredictionResult result={result} onReset={() => setResult(null)} />
        )}
      </div>
    </main>
  );
}
