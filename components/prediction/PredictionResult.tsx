import { PredictionResult } from "@/types";

interface Props {
  result: PredictionResult;
  onReset: () => void;
}

const ConfidenceBar = ({ value }: { value: number }) => (
  <div style={{
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: "99px",
    height: "4px",
  }}>
    <div style={{
      width: `${value}%`,
      height: "4px",
      borderRadius: "99px",
      backgroundColor: "#000000",
      transition: "width 0.7s ease",
    }} />
  </div>
);

const SurvivalBadge = ({ chance }: { chance: number }) => {
  const bg = chance >= 75 ? "#d1ffca" : chance >= 45 ? "#fff100" : "#fecaca";
  return (
    <span style={{
      fontSize: "12px",
      fontFamily: "JetBrains Mono, monospace",
      backgroundColor: bg,
      borderRadius: "20px",
      padding: "2px 8px",
      whiteSpace: "nowrap",
    }}>
      {chance}%
    </span>
  );
};

export default function PredictionResult({ result, onReset }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

      {/* Genre tag */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{
          fontSize: "12px",
          fontFamily: "JetBrains Mono, monospace",
          backgroundColor: "#fff100",
          borderRadius: "20px",
          padding: "4px 12px",
          letterSpacing: "-0.03em",
        }}>
          {result.genre}
        </span>
        <span style={{
          fontSize: "12px",
          fontFamily: "JetBrains Mono, monospace",
          color: "#979797",
        }}>
          Genre detected
        </span>
      </div>

      {/* Main prediction */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "32px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
        <p style={{
          fontSize: "12px",
          fontFamily: "JetBrains Mono, monospace",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#444444",
        }}>
          What happens next
        </p>
        <p style={{
          fontSize: "18px",
          lineHeight: 1.4,
          letterSpacing: "-0.02em",
          color: "#000000",
        }}>
          {result.mainPrediction}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "12px", color: "#979797", fontFamily: "JetBrains Mono, monospace" }}>
              Confidence
            </span>
            <span style={{ fontSize: "12px", fontFamily: "JetBrains Mono, monospace" }}>
              {result.confidence}%
            </span>
          </div>
          <ConfidenceBar value={result.confidence} />
        </div>
      </div>

      {/* Character survival */}
      {result.characters.length > 0 && (
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "32px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>
          <p style={{
            fontSize: "12px",
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#444444",
          }}>
            Survival chances
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {result.characters.map((char) => (
              <div key={char.name} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{
                  fontSize: "14px",
                  color: "#000000",
                  letterSpacing: "-0.02em",
                  minWidth: "100px",
                }}>
                  {char.name}
                </span>
                <div style={{ flex: 1 }}>
                  <ConfidenceBar value={char.survivalChance} />
                </div>
                <SurvivalBadge chance={char.survivalChance} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alternative timeline */}
      <div style={{
        backgroundColor: "#f3f3f3",
        borderRadius: "32px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}>
        <p style={{
          fontSize: "12px",
          fontFamily: "JetBrains Mono, monospace",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#444444",
        }}>
          Alternative timeline
        </p>
        <p style={{
          fontSize: "16px",
          lineHeight: 1.5,
          letterSpacing: "-0.02em",
          color: "#000000",
        }}>
          {result.alternativeTimeline}
        </p>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
          color: "#444444",
          letterSpacing: "-0.02em",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
          textAlign: "center",
          padding: "8px",
        }}
      >
        Try another story
      </button>

    </div>
  );
}