import React, { useMemo } from "react";

/* ---------- Mock data ---------- */
const funnelData = [
  { key: "leads", label: "Leads", value: 641, color: "#3B82F6" },
  { key: "contacted", label: "Contacted", value: 558, color: "#2563EB" },
  { key: "quoted", label: "Quoted", value: 387, color: "#F97316" },
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
  averageROI: 703,
};

/* ---------- Helper functions ---------- */
function fmtMoney(n) {
  return `$${n.toLocaleString()}`;
}
function costPerLead(cost, leads) {
  if (!leads || cost === 0) return "$0.00";
  return `$${(cost / leads).toFixed(2)}`;
}
function computeROI(cost, revenue) {
  if (cost === 0) return revenue > 0 ? Infinity : 0;
  return Math.round(((revenue - cost) / cost) * 100);
}
function downloadCSV(rows) {
  const header = ["Source", "Cost", "Leads", "Cost/Lead", "Revenue", "ROI (%)"];
  const lines = rows.map((r) => {
    const roi = computeROI(r.cost, r.revenue);
    return [
      r.source,
      r.cost,
      r.leads,
      costPerLead(r.cost, r.leads).replace('$', ''),
      r.revenue,
      roi === Infinity ? 'Infinity' : roi,
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

/* ---------- UI Icons ---------- */
const ExportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

/* ---------- UI Components ---------- */
const FunnelVisualization = ({ data }) => {
    const width = 800;
    const height = 240;
    const max = data[0].value;
    const segH = height / data.length;

    const shapes = data.map((d, i) => {
        const topWidth = (d.value / max) * (width * 0.9);
        const nextValue = data[i + 1]?.value ?? d.value * 0.4;
        const bottomWidth = (nextValue / max) * (width * 0.9);
        const yTop = i * segH;
        const yBottom = (i + 1) * segH;

        const points = [
            [(width - topWidth) / 2, yTop],
            [(width + topWidth) / 2, yTop],
            [(width + bottomWidth) / 2, yBottom],
            [(width - bottomWidth) / 2, yBottom],
        ];

        return { ...d, points };
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-4 lg:gap-8">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-auto"
                role="img"
                aria-label="Conversion funnel"
                preserveAspectRatio="xMidYMid meet"
            >
                {shapes.map((s) => (
                    <polygon
                        key={s.key}
                        points={s.points.map((p) => p.join(",")).join(" ")}
                        fill={s.color}
                    />
                ))}
            </svg>
            <div className="flex flex-row justify-around lg:flex-col lg:justify-around h-full py-2">
                 {data.map((d) => (
                    <div key={d.key} className="text-xs sm:text-sm font-medium text-slate-600 text-center lg:text-left">{d.label}</div>
                ))}
            </div>
        </div>
    );
};

/* ---------- Main Page Component ---------- */
const AnalyticsPage = ({ toggleSidebar }) => {
    const roiRows = useMemo(() => roiRowsInit, []);
    const maxRoi = useMemo(() => {
        const rois = roiRows.map(r => computeROI(r.cost, r.revenue)).filter(roi => roi !== Infinity && roi > 0);
        return rois.length > 0 ? Math.max(...rois) : 1;
    }, [roiRows]);
  
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-slate-50 min-h-full">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden p-1 -ml-1 text-slate-600 hover:text-slate-900">
                <MenuIcon />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Analytics</h1>
              <p className="text-sm text-slate-500 mt-1">Track ROI and performance metrics</p>
            </div>
          </div>
          <button
            onClick={() => downloadCSV(roiRows)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ExportIcon />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </header>

        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200/50">
          <h3 className="text-lg font-semibold text-slate-800">Conversion Funnel</h3>
          <div className="mt-4">
              <FunnelVisualization data={funnelData} />
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-4 pt-4 border-t border-slate-200 text-center">
            <div>
                <div className="text-xl md:text-2xl font-bold text-slate-800">{funnelData[0].value.toLocaleString()}</div>
                <div className="text-xs text-slate-500 mt-1">{funnelData[0].label}</div>
            </div>
            {funnelData.slice(1).map((f, idx) => {
                const prev = funnelData[idx].value;
                const conv = prev ? Math.round((f.value / prev) * 100) : 0;
                 return (
                    <div key={f.key}>
                      <div className="text-xl md:text-2xl font-bold text-slate-800">{f.value.toLocaleString()}</div>
                      <div className="text-xs text-slate-500 mt-1">{f.label}</div>
                      <div className="text-xs text-emerald-600 font-medium mt-1">{conv}% conversion</div>
                    </div>
                );
            })}
          </div>
        </section>

        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200/50">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">ROI by Source</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 font-medium uppercase tracking-wider">
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4 text-right">Cost</th>
                  <th className="py-3 px-4 text-right">Leads</th>
                  <th className="py-3 px-4 text-right">Cost/Lead</th>
                  <th className="py-3 px-4 text-right">Revenue</th>
                  <th className="py-3 px-4">ROI</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {roiRows.map((r) => {
                  const roi = computeROI(r.cost, r.revenue);
                  const barWidth = roi === Infinity ? 100 : Math.max(0, (roi / maxRoi) * 100);
                  return (
                    <tr key={r.source} className="border-t border-slate-200/80">
                      <td className="py-4 px-4 font-medium text-slate-800">{r.source}</td>
                      <td className="py-4 px-4 text-right">{fmtMoney(r.cost)}</td>
                      <td className="py-4 px-4 text-right">{r.leads}</td>
                      <td className="py-4 px-4 text-right">{costPerLead(r.cost, r.leads)}</td>
                      <td className="py-4 px-4 text-right">{fmtMoney(r.revenue)}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                           <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div style={{ width: `${barWidth}%` }} className="h-full bg-emerald-400" />
                           </div>
                           <span className="font-medium">{roi === Infinity ? '∞' : `${roi}%`}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg bg-white border border-slate-200/50 shadow-sm">
              <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-500">Total Spend</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{fmtMoney(summaryKPIs.totalSpend)}</p>
                  </div>
                  <div className="w-5 h-5 bg-slate-100 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 17l5-5m0 0l-5-5m5 5H6" /></svg>
                  </div>
              </div>
              <p className="text-xs text-red-600 mt-2">-12% vs last month</p>
            </div>
            <div className="p-5 rounded-lg bg-white border border-slate-200/50 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{fmtMoney(summaryKPIs.totalRevenue)}</p>
                  </div>
                  <div className="w-5 h-5 bg-slate-100 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </div>
              </div>
              <p className="text-xs text-emerald-600 mt-2">+28% vs last month</p>
            </div>
            <div className="p-5 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20">
              <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-90">Average ROI</p>
                    <p className="text-2xl font-bold mt-1">{summaryKPIs.averageROI}%</p>
                  </div>
                  <div className="w-5 h-5 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </div>
              </div>
              <p className="text-xs opacity-90 mt-2">+15% vs last month</p>
            </div>
          </section>
      </div>
    </div>
  );
}

export default AnalyticsPage;