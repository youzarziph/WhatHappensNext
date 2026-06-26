import { PredictionResult } from "@/types";

interface Props {
  result: PredictionResult;
  onReset: () => void;
}

const ConfidenceBar = ({ value }: { value: number }) => (
  <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-2">
    <div
      className="bg-purple-500 h-2 rounded-full transition-all duration-700"
      style={{ width: `${value}%` }}
    />
  </div>
);

const SurvivalBadge = ({ chance }: { chance: number }) => {
  const color =
    chance >= 75
      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      : chance >= 45
      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";

  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>
      {chance}%
    </span>
  );
};

export default function PredictionResult({ result, onReset }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-3 py-1 rounded-full font-medium">
          {result.genre}
        </span>
        <span className="text-xs text-neutral-400">Genre detected</span>
      </div>

      <div className="flex flex-col gap-3 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
        <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
          What happens next
        </h2>
        <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
          {result.mainPrediction}
        </p>
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="flex justify-between text-xs text-neutral-500">
            <span>Prediction confidence</span>
            <span className="font-medium">{result.confidence}%</span>
          </div>
          <ConfidenceBar value={result.confidence} />
        </div>
      </div>

      {result.characters.length > 0 && (
        <div className="flex flex-col gap-3 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
          <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
            Survival chances
          </h2>
          <div className="flex flex-col gap-3">
            {result.characters.map((char) => (
              <div key={char.name} className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {char.name}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-28">
                    <ConfidenceBar value={char.survivalChance} />
                  </div>
                  <SurvivalBadge chance={char.survivalChance} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 p-5 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
          Alternative timeline
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm italic">
          {result.alternativeTimeline}
        </p>
      </div>

      <button
        onClick={onReset}
        className="text-sm text-neutral-500 hover:text-purple-600 dark:hover:text-purple-400 transition underline underline-offset-2 text-center"
      >
        Try another story
      </button>
    </div>
  );
}
