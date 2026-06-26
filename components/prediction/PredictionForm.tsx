"use client";

import { useState, useEffect } from "react";
import { PredictionResult } from "@/types";

interface Props {
  onResult: (result: PredictionResult) => void;
  onLoading: (loading: boolean) => void;
}

export default function PredictionForm({ onResult, onLoading }: Props) {
  const [story, setStory] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async () => {
    setError("");
    onLoading(true);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ story }),
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        setError(json.error || "Something went wrong.");
        return;
      }

      onResult(json.data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Paste your story, chapter, or scene
        </label>
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="e.g. Naruto has entered the battlefield. Madara has revealed his true power..."
          rows={6}
          className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition"
        />
        <div className="flex justify-between items-center">
          <span className="text-xs text-neutral-400">{story.length} / 3000</span>
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!mounted || story.trim().length < 20}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition text-sm"
      >
        Predict What Happens Next →
      </button>
    </div>
  );
}