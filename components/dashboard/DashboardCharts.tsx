"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Props {
  genreBreakdown: { genre: string; count: number }[];
  predictionsOverTime: { date: string; count: number }[];
}

const COLORS = ["#00827c", "#cbfffc", "#003734", "#bbc7c6", "#edfffe", "#011d1c"];

export default function DashboardCharts({ genreBreakdown, predictionsOverTime }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

      <div style={{ background: "#011d1c", borderRadius: "16px", padding: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00827c" }} />
          <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#bbc7c6" }}>
            Predictions Over Time
          </span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={predictionsOverTime} barSize={20}>
            <XAxis dataKey="date" tick={{ fill: "#bbc7c6", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#bbc7c6", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ background: "#003734", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }} cursor={{ fill: "rgba(0,130,124,0.1)" }} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cbfffc" />
                <stop offset="100%" stopColor="#00827c" />
              </linearGradient>
            </defs>
            <Bar dataKey="count" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: "#011d1c", borderRadius: "16px", padding: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00827c" }} />
          <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#bbc7c6" }}>
            Genre Breakdown
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <ResponsiveContainer width="50%" height={180}>
            <PieChart>
              <Pie data={genreBreakdown} dataKey="count" nameKey="genre" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {genreBreakdown.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#003734", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            {genreBreakdown.map((item, index) => (
              <div key={item.genre} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: COLORS[index % COLORS.length], flexShrink: 0 }} />
                <span style={{ fontSize: "11px", color: "#bbc7c6", flex: 1 }}>{item.genre}</span>
                <span style={{ fontSize: "11px", color: "#cbfffc" }}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
