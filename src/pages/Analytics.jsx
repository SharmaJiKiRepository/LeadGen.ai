// ai-move-clone/src/pages/Analytics.jsx
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
} from "recharts";

/* ---------- Mock data ---------- */
const funnelData = [
  { key: "leads", label: "Leads", value: 641, color: "#3B82F6" },
  { key: "contacted", label: "Contacted", value: 558, color: "#1E40AF" },
  { key: "quoted", label: "Quoted", value: 387, color: "#F59E0B" },
  { key: "booked", label: "Booked", value: 234, color: "#10B981" },
];

const roiRowsInit = [
  { source: "Google Ads", cost: 2840, leads: 245, revenue: 18900 },
  { source: "Facebook Ads", cost: 1920, leads: 178, revenue: 12300 },
  { source: "Organic Search", cost: 0, leads: 89, revenue: 6200 },
  { source: "Referrals", cost: 450, leads: 67, revenue: 5800 },
  { source: "Email Campaign", cost: 680, leads: 62, revenue: 4100 },
];

const summaryKPIs = {
  totalSpend: 5890,
  totalRevenue: 47300,
  averageROI: 703, // percent
};

function fmtMoney(n) {
  return `$${n.toLocaleString()}`;
}
function costPerLead(cost, leads) {
  if (!leads) return "$0.00";
  return `$${(cost / leads).toFixed(2)}`;
}
function computeROI(cost, revenue) {
  if (cost === 0) return 100 * (revenue ? 1 : 0);
  return Math.round(((revenue - cost) / cost) * 100);
}
function downloadCSV(rows) {
  const header = ["Source", "Cost", "Leads", "Cost/Lead", "Revenue", "ROI"];
  const lines = rows.map((r) => {
    const roi = computeROI(r.cost, r.revenue);
    return [
      r.source,
      r.cost,
      r.leads,
      r.cost && r.leads ? (r.cost / r.leads).toFixed(2) : "0.00",
      r.revenue,
      `${roi}%`,
    ].join(",");
  });
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "roi-by-source.csv";
  a.click();
  URL.revokeObjectURL(url);
}

/* ---------- Funnel SVG Component ---------- */
function FunnelSVG({ data, onHover, activeKey }) {
  const max = Math.max(...data.map((d) => d.value));
  const pad = 32;
  const width = 1180; // wider so it looks like the screenshot in large containers
  const height = 260;
  const centerX = width / 2;
  const segH = height / data.length;

  const shapes = data.map((d, i) => {
    const usable = width - pad * 2;
    const topWidth = (d.value / max) * usable + 80;
    const nextValue = data[i + 1] ? data[i + 1].value : Math.max(10, d.value * 0.4);
    const bottomWidth = (nextValue / max) * usable + 80;
    const yTop = i * segH;
    const yBottom = (i + 1) * segH;
    const points = [
      [centerX - topWidth / 2, yTop],
      [centerX + topWidth / 2, yTop],
      [centerX + bottomWidth / 2, yBottom],
      [centerX - bottomWidth / 2, yBottom],
    ];
    return {
      ...d,
      points,
      midX: centerX,
      midY: (yTop + yBottom) / 2,
      yTop,
      yBottom,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Conversion funnel"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="shadow" />
          <feOffset dx="0" dy="6" in="shadow" result="shadow2" />
          <feMerge>
            <feMergeNode in="shadow2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {shapes.map((s) => {
        const d = s.points.map((p) => p.join(",")).join(" ");
        const isActive = activeKey === s.key;
        const baseOpacity = isActive ? 1 : 0.98;
        return (
          <g key={s.key}>
            <polygon
              tabIndex={0}
              role="button"
              aria-label={`${s.label} - ${s.value}`}
              onFocus={() => onHover(s.key)}
              onBlur={() => onHover(null)}
              onMouseEnter={() => onHover(s.key)}
              onMouseLeave={() => onHover(null)}
              points={d}
              fill={s.color}
              fillOpacity={baseOpacity}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1.5}
              style={{
                filter: "url(#softShadow)",
                transformOrigin: `${s.midX}px ${s.midY}px`,
                transition: "transform 180ms ease, opacity 120ms ease",
                transform: isActive ? "translateY(-6px) scale(1.02)" : "none",
                cursor: "pointer",
              }}
            />
            {/* label near right side of segment */}
            <text
              x={s.points[1][0] - 24}
              y={s.midY + 6}
              fontSize="13"
              fill="#0f172a"
              textAnchor="end"
              style={{ pointerEvents: "none" }}
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Main Page Component ---------- */
export default function Analytics() {
  const [roiRows, setRoiRows] = useState(roiRowsInit);
  const [sortKey, setSortKey] = useState({ key: "source", dir: "asc" });
  const [activeFunnel, setActiveFunnel] = useState(null);

  const sortedRows = useMemo(() => {
    const arr = [...roiRows];
    arr.sort((a, b) => {
      const k = sortKey.key;
      if (typeof a[k] === "number") {
        return sortKey.dir === "asc" ? a[k] - b[k] : b[k] - a[k];
      } else {
        return sortKey.dir === "asc"
          ? String(a[k]).localeCompare(String(b[k]))
          : String(b[k]).localeCompare(String(a[k]));
      }
    });
    return arr;
  }, [roiRows, sortKey]);

  function toggleSort(k) {
    setSortKey((prev) => {
      if (prev.key === k) return { key: k, dir: prev.dir === "asc" ? "desc" : "asc" };
      return { key: k, dir: "asc" };
    });
  }

  const sparkData = [
    { x: "Jan", y: 200 },
    { x: "Feb", y: 280 },
    { x: "Mar", y: 320 },
    { x: "Apr", y: 300 },
    { x: "May", y: 380 },
    { x: "Jun", y: 430 },
  ];

  return (
    <main className="p-6 md:p-8 lg:pl-12 lg:pr-12">
      {/* container width similar to screenshot */}
      <div className="mx-auto max-w-[1180px] space-y-6">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Analytics</h1>
            <p className="text-sm text-slate-500 mt-1">Track ROI and performance metrics</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => downloadCSV(sortedRows)}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md shadow-sm text-sm hover:bg-slate-50 focus:outline-none"
              title="Export Report"
            >
              <span className="text-slate-500">⤓</span>
              <span>Export Report</span>
            </button>
          </div>
        </header>

        {/* Funnel Card */}
        <section className="bg-white p-6 rounded-2xl shadow-[0_6px_18px_rgba(14,20,30,0.06)]">
          <h3 className="text-base font-medium text-slate-800 mb-4">Conversion Funnel</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 bg-white rounded-lg p-0">
              <div className="px-4 pb-4">
                <div className="w-full">
                  <div className="h-[260px]">
                    <FunnelSVG data={funnelData} onHover={(k) => setActiveFunnel(k)} activeKey={activeFunnel} />
                  </div>
                </div>
              </div>

              {/* bottom stats row under funnel */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {funnelData.map((f) => {
                    const idx = funnelData.findIndex((d) => d.key === f.key);
                    const prev = idx > 0 ? funnelData[idx - 1].value : f.value;
                    const conv = prev ? Math.round((f.value / prev) * 100) : 100;
                    return (
                      <div key={f.key} className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-slate-800">{f.value}</div>
                        <div className="text-xs text-slate-500 mt-1">{f.label}</div>
                        <div className="text-xs text-green-600 mt-1">{conv}% conversion</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* KPI column on the right */}
            <aside className="flex flex-col gap-4">
              <div className="p-4 rounded-lg bg-white border shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-500">Total Spend</div>
                  <div className="text-xl font-semibold text-slate-900">{fmtMoney(summaryKPIs.totalSpend)}</div>
                  <div className="text-xs text-green-600">-12% vs last month</div>
                </div>
                <div className="w-28 h-12">
                  <ResponsiveContainer width="100%" height={48}>
                    <AreaChart data={sparkData}>
                      <ReTooltip />
                      <YAxis hide />
                      <XAxis dataKey="x" hide />
                      <Area type="monotone" dataKey="y" stroke="#06b6d4" fill="#eff6ff" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white border shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-500">Total Revenue</div>
                  <div className="text-xl font-semibold text-slate-900">{fmtMoney(summaryKPIs.totalRevenue)}</div>
                  <div className="text-xs text-green-600">+28% vs last month</div>
                </div>
                <div className="w-28 h-12">
                  <ResponsiveContainer width="100%" height={48}>
                    <AreaChart data={sparkData}>
                      <ReTooltip />
                      <YAxis hide />
                      <XAxis dataKey="x" hide />
                      <Area type="monotone" dataKey="y" stroke="#10b981" fill="#ecfdf5" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm">
                <div className="text-sm opacity-95">Average ROI</div>
                <div className="text-2xl font-semibold">{summaryKPIs.averageROI}%</div>
                <div className="text-xs opacity-90">+15% vs last month</div>
              </div>
            </aside>
          </div>
        </section>

        {/* ROI by Source table */}
        <section className="bg-white p-6 rounded-2xl shadow-[0_6px_18px_rgba(14,20,30,0.06)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-slate-800">ROI by Source</h3>
            <div>
              <button
                onClick={() => downloadCSV(sortedRows)}
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 bg-white border rounded-md shadow-sm text-sm hover:bg-slate-50"
              >
                ⤓ Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y">
              <thead>
                <tr className="text-left text-xs text-slate-500">
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => toggleSort("cost")}>
                    Cost {sortKey.key === "cost" ? (sortKey.dir === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => toggleSort("leads")}>
                    Leads {sortKey.key === "leads" ? (sortKey.dir === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th className="py-3 px-4">Cost/Lead</th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => toggleSort("revenue")}>
                    Revenue {sortKey.key === "revenue" ? (sortKey.dir === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th className="py-3 px-4">ROI</th>
                </tr>
              </thead>

              <tbody className="text-sm text-slate-700">
                {sortedRows.map((r, idx) => {
                  const roi = computeROI(r.cost, r.revenue);
                  return (
                    <tr key={r.source} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-slate-100`}>
                      <td className="py-4 px-4">{r.source}</td>
                      <td className="py-4 px-4">{fmtMoney(r.cost)}</td>
                      <td className="py-4 px-4">{r.leads}</td>
                      <td className="py-4 px-4">{costPerLead(r.cost, r.leads)}</td>
                      <td className="py-4 px-4">{fmtMoney(r.revenue)}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-28 h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${Math.min(Math.abs(roi), 120)}%` }}
                              className="h-full bg-green-500"
                            />
                          </div>
                          <span className="text-sm font-medium">{roi}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* KPI row under table */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white border shadow-sm">
              <div className="text-sm text-slate-500">Total Spend</div>
              <div className="text-2xl font-semibold text-slate-900">{fmtMoney(summaryKPIs.totalSpend)}</div>
              <div className="text-xs text-green-600">-12% vs last month</div>
            </div>

            <div className="p-4 rounded-lg bg-white border shadow-sm">
              <div className="text-sm text-slate-500">Total Revenue</div>
              <div className="text-2xl font-semibold text-slate-900">{fmtMoney(summaryKPIs.totalRevenue)}</div>
              <div className="text-xs text-green-600">+28% vs last month</div>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm">
              <div className="text-sm opacity-95">Average ROI</div>
              <div className="text-2xl font-semibold">{summaryKPIs.averageROI}%</div>
              <div className="text-xs opacity-90">+15% vs last month</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
