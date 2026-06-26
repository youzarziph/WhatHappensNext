 
import { auth } from "@/auth";
import { getUserPredictions } from "@/services/user";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const predictions = await getUserPredictions((session.user as any).id);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Your Predictions
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              {predictions.length} prediction{predictions.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          <Link
            href="/"
            className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
          >
            New Prediction
          </Link>
        </div>

        {predictions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500">No predictions yet.</p>
            <Link href="/" className="text-purple-600 hover:underline text-sm mt-2 inline-block">
              Make your first prediction
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {predictions.map((p: any) => (
              <div
                key={p._id.toString()}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-2 py-0.5 rounded-full">
                    {p.result.genre}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {p.story}
                </p>
                <p className="text-sm text-neutral-800 dark:text-neutral-200">
                  {p.result.mainPrediction}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500">Confidence</span>
                  <span className="text-xs font-medium text-purple-600">
                    {p.result.confidence}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}