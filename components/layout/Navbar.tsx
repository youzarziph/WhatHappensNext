"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            What Happens Next?
          </Link>
          <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-2 py-0.5 rounded-full">
            AI
          </span>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm text-neutral-500">
                Hi, {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-neutral-500 hover:text-red-500 transition"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-neutral-500 hover:text-neutral-800 transition"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}