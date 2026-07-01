import { auth } from "@/auth";
import { getDashboardStats, getUserPredictions } from "@/services/user";
import { redirect } from "next/navigation";
import Link from "next/link";
import DashboardCharts from "@/components/dashboard/DashboardCharts";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const [stats, { predictions }] = await Promise.all([
    getDashboardStats((session.user as any).id),
    getUserPredictions((session.user as any).id, 1, ""),
  ]);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#012624", fontFamily: "Inter, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00827c" }} />
              <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "2.4px", textTransform: "uppercase", color: "#bbc7c6" }}>
                Overview
              </span>
            </div>
            <h1 style={{ fontSize: "36px", fontWeight: 400, letterSpacing: "-1px", color: "#fff" }}>
              Your Dashboard
            </h1>
          </div>
          <Link
            href="/"
            style={{
              background: "linear-gradient(90deg, #00827c, #cbfffc)",
              color: "#011d1c",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "6px",
              padding: "12px 24px",
            }}
          >
            New Prediction ↗
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Total Predictions", value: stats.total, suffix: "" },
            { label: "Avg Confidence", value: stats.avgConfidence, suffix: "%" },
            { label: "Top Genre", value: stats.topGenre, suffix: "" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ background: "#011d1c", borderRadius: "16px", padding: "28px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00827c" }} />
                <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#bbc7c6" }}>
                  {stat.label}
                </span>
              </div>
              <p style={{ fontSize: "40px", fontWeight: 400, letterSpacing: "-1px", color: "#fff", lineHeight: 1 }}>
                {stat.value}{stat.suffix}
              </p>
            </div>
          ))}
        </div>

        <DashboardCharts
          genreBreakdown={stats.genreBreakdown}
          predictionsOverTime={stats.predictionsOverTime}
        />

        <div style={{ marginTop: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00827c" }} />
              <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#bbc7c6" }}>
                Recent Activity
              </span>
            </div>
            <Link href="/history" style={{ fontSize: "11px", color: "#bbc7c6", letterSpacing: "1px", textTransform: "uppercase", textDecoration: "underline", textUnderlineOffset: "4px" }}>
              View all
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {predictions.slice(0, 3).map((p: any) => (
              <div
                key={p._id.toString()}
                style={{ background: "#011d1c", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "14px", color: "#fff", letterSpacing: "-0.02em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "4px" }}>
                    {p.story.slice(0, 80)}...
                  </p>
                  <p style={{ fontSize: "12px", color: "#bbc7c6", letterSpacing: "0.5px" }}>
                    {p.result.mainPrediction.slice(0, 60)}...
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                  <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "1.4px", textTransform: "uppercase", background: "linear-gradient(90deg,#cbfffc,#edfffe)", color: "#011d1c", borderRadius: "6px", padding: "3px 10px" }}>
                    {p.result.genre}
                  </span>
                  <span style={{ fontSize: "11px", color: "#cbfffc", letterSpacing: "1px" }}>
                    {p.result.confidence}%
                  </span>
                  <span style={{ fontSize: "11px", color: "#bbc7c6" }}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
