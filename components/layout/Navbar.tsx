export default function Navbar() {
  return (
    <nav className="border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">
            What Happens Next?
          </span>
          <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-2 py-0.5 rounded-full">
            AI
          </span>
        </div>
        <span className="text-sm text-neutral-500">Story Prediction Engine</span>
      </div>
    </nav>
  );
}
