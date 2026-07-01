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
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "32px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
        <label style={{
          fontSize: "12px",
          fontFamily: "JetBrains Mono, monospace",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#444444",
        }}>
          Your Story
        </label>
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Naruto has entered the battlefield. Madara has revealed his true power..."
          rows={7}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            fontSize: "16px",
            lineHeight: 1.5,
            letterSpacing: "-0.02em",
            color: "#000000",
            fontFamily: "Inter, sans-serif",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            fontSize: "12px",
            fontFamily: "JetBrains Mono, monospace",
            color: "#979797",
          }}>
            {story.length} / 3000
          </span>
          {error && (
            <span style={{ fontSize: "12px", color: "#ef4444" }}>{error}</span>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!mounted || story.trim().length < 20}
        style={{
          width: "100%",
          backgroundColor: !mounted || story.trim().length < 20 ? "#979797" : "#000000",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 500,
          padding: "16px",
          borderRadius: "4px",
          border: "none",
          cursor: !mounted || story.trim().length < 20 ? "not-allowed" : "pointer",
          letterSpacing: "-0.02em",
          transition: "background-color 0.2s",
        }}
      >
        Predict What Happens Next →
      </button>
    </div>
  );
}