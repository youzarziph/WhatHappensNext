"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div style={{ width: "100%", padding: "24px 24px 12px 24px" }}>
      <nav
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#000000",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          What Happens Next?
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link
            href="/"
            style={{
              fontSize: "14px",
              color: "#444444",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            Predict
          </Link>
          {session && (
            <Link
              href="/history"
              style={{
                fontSize: "14px",
                color: "#444444",
                textDecoration: "none",
                letterSpacing: "-0.02em",
              }}
            >
              History
            </Link>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {session ? (
            <>
              <span style={{ fontSize: "14px", color: "#979797", letterSpacing: "-0.02em" }}>
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                style={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "8px 20px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "-0.02em",
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  fontSize: "14px",
                  color: "#444444",
                  textDecoration: "none",
                  letterSpacing: "-0.02em",
                }}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                style={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "8px 20px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  letterSpacing: "-0.02em",
                }}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}