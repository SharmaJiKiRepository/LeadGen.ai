// ai-move-clone/src/pages/Dashboard.jsx
import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const metrics = [
  { title: "Leads Received", value: "641", badge: "+28%", gradient: "from-blue-500 to-indigo-600" },
  { title: "Contact Rate", value: "87%", badge: "+5%", gradient: null },
  { title: "Bookings", value: "234", badge: "+19%", gradient: null },
  { title: "ROI", value: "342%", badge: "+12%", gradient: null },
];

const lineData = [
  { month: "Jan", leads: 245, bookings: 89 },
  { month: "Feb", leads: 320, bookings: 120 },
  { month: "Mar", leads: 410, bookings: 150 },
  { month: "Apr", leads: 380, bookings: 140 },
  { month: "May", leads: 460, bookings: 170 },
  { month: "Jun", leads: 620, bookings: 200 },
];

const pieData = [
  { name: "AI Handled", value: 68 },
  { name: "Human Handled", value: 32 },
];
const COLORS = ["#7C3AED", "#60A5FA"];

const recent = [
  { name: "Sarah Johnson", note: "Lead responded positively, likely to book. Needs quote for 3BR move.", time: "2 mins ago" },
  { name: "Mike Chen", note: "Price-sensitive customer. Requested call back tomorrow at 2 PM.", time: "15 mins ago" },
  { name: "Emily Rodriguez", note: "Immediate booking! Moving next week. Full-service package selected.", time: "28 mins ago" },
];

export default function DashboardExact() {
  const [query, setQuery] = useState("");

  const filteredRecent = useMemo(() => {
    if (!query) return recent;
    return recent.filter((r) => (r.name + r.note).toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back! Here's your business overview.</p>
        </div>

        <div className="flex items-center gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search activity..."
            className="hidden md:block px-3 py-2 rounded-lg border border-slate-200 bg-white/80 w-72 text-sm focus:outline-none"
          />
          <button className="px-4 py-2 rounded-lg bg-white border">+ Create</button>
          <div className="flex items-center gap-2">
            <img src={`https://api.dicebear.com/6.x/initials/svg?seed=Harsh`} alt="avatar" className="w-9 h-9 rounded" />
            <div className="text-sm">Harsh</div>
          </div>
        </div>
      </header>

      {/* Metric cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((m, idx) => (
          <div key={m.title} className={`rounded-xl p-5 shadow-sm ${idx === 0 ? `bg-gradient-to-r ${m.gradient} text-white` : "bg-white"}`}>
            <div className="flex items-center justify-between">
              <div className="text-sm opacity-80">{m.title}</div>
              <div className="text-xs bg-white/10 px-2 py-1 rounded-full">{m.badge}</div>
            </div>
            <div className="mt-3 text-2xl font-semibold">{m.value}</div>
          </div>
        ))}
      </section>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Leads vs Bookings</h3>
            <div className="text-sm text-slate-500">Last 6 months</div>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2ff" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8" }} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-medium mb-3">AI vs Human</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={4} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-medium mb-3">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">Start Dialer</button>
            <button className="w-full px-4 py-3 rounded-lg border">Create AI Agent</button>
            <button className="w-full px-4 py-3 rounded-lg border">Buy Leads</button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-medium mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {filteredRecent.map((r, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#f8fafc]">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.time}</div>
                </div>
                <div className="text-sm text-slate-600 mt-1">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Jobs placeholder */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium mb-3">Jobs</h3>
        <div className="text-sm text-slate-500">Table and other controls would go here. This component is built to be drop-in and extended.</div>
      </div>
    </div>
  );
}
