import { auth } from "@/auth";
import { getUserPredictions } from "@/services/user";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function HistoryPage({ searchParams }: Props) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { page, search } = await searchParams;
  const currentPage = parseInt(page || "1");
  const searchQuery = search || "";

  const { predictions, total, pages } = await getUserPredictions(
    (session.user as any).id,
    currentPage,
    searchQuery
  );

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-3xl mx-auto px-6 py-12">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Your Predictions
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              {total} prediction{total !== 1 ? "s" : ""} saved
            </p>
          </div>
          <Link
            href="/"
            className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
          >
            New Prediction
          </Link>
        </div>

        <form method="GET" className="mb-10">
          <div className="flex gap-3 w-full">
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search by story, genre, or prediction..."
              className="flex-1 min-w-0 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition shrink-0"
            >
              Search
            </button>
            {searchQuery && (
              <Link
                href="/history"
                className="bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 text-neutral-700 dark:text-neutral-200 px-4 py-3 rounded-xl text-sm transition shrink-0"
              >
                Clear
              </Link>
            )}
          </div>
        </form>

        {predictions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500">
              {searchQuery ? "No predictions match your search." : "No predictions yet."}
            </p>
            <Link
              href="/"
              className="text-purple-600 hover:underline text-sm mt-2 inline-block"
            >
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

        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {currentPage > 1 && (
              <Link
                href={`/history?page=${currentPage - 1}${searchQuery ? `&search=${searchQuery}` : ""}`}
                className="px-4 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                Previous
              </Link>
            )}
            <span className="text-sm text-neutral-500">
              Page {currentPage} of {pages}
            </span>
            {currentPage < pages && (
              <Link
                href={`/history?page=${currentPage + 1}${searchQuery ? `&search=${searchQuery}` : ""}`}
                className="px-4 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                Next
              </Link>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
