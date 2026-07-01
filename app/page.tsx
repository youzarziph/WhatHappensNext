"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import PredictionForm from "@/components/prediction/PredictionForm";
import PredictionResult from "@/components/prediction/PredictionResult";
import { PredictionResult as TPredictionResult } from "@/types";

export default function Home() {
  const [result, setResult] = useState<TPredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResult = (data: TPredictionResult) => {
    setResult(data);
    setLoading(false);
  };

  const handleLoading = (isLoading: boolean) => {
    if (isLoading) {
      setResult(null);
      setLoading(true);
    }
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#e5e7eb" }}>
      <Navbar />

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px" }}>

        {!result && !loading && (
          <div style={{ marginBottom: "48px" }}>
            <p style={{
              fontSize: "12px",
              fontFamily: "JetBrains Mono, monospace",
              letterSpacing: "0.08em",
              color: "#444444",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>
              AI Story Engine
            </p>
            <h1 style={{
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-2.4px",
              color: "#000000",
              marginBottom: "24px",
            }}>
              WHAT HAPPENS{" "}
              <span style={{ color: "#fff100", WebkitTextStroke: "2px #000000" }}>
                NEXT?
              </span>
            </h1>
            <p style={{
              fontSize: "18px",
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
              color: "#000000",
              maxWidth: "480px",
            }}>
              Paste any story, anime scene, book chapter, or movie summary.
              Get an AI prediction of what comes next.
            </p>
          </div>
        )}

        {loading && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            padding: "96px 0",
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              border: "2px solid #000000",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }} />
            <p style={{ fontSize: "14px", color: "#444444", letterSpacing: "-0.02em" }}>
              Analyzing your story...
            </p>
          </div>
        )}

        {!loading && !result && (
          <PredictionForm onResult={handleResult} onLoading={handleLoading} />
        )}

        {!loading && result && (
          <PredictionResult result={result} onReset={() => setResult(null)} />
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}