// ai-move-clone/src/pages/Leads.jsx
import React, { useMemo, useState } from "react";

/* ---------- Mock data (kept as-is) ---------- */
const initialLeads = [
  { id: 1, name: "Sarah Johnson", from: "90210", to: "10001", source: "Google Ads", status: "New", score: 92, assigned: "AI Bot" },
  { id: 2, name: "Mike Chen", from: "94102", to: "60601", source: "Facebook", status: "Contacted", score: 78, assigned: "John Smith" },
  { id: 3, name: "Emily Rodriguez", from: "33101", to: "98101", source: "Organic", status: "Booked", score: 95, assigned: "AI Bot" },
  { id: 4, name: "David Park", from: "02108", to: "94102", source: "Referral", status: "Quoted", score: 85, assigned: "Jane Doe" },
  { id: 5, name: "Lisa Anderson", from: "10001", to: "90210", source: "Google Ads", status: "New", score: 71, assigned: "AI Bot" },
  { id: 6, name: "Kevin Liu", from: "20001", to: "30002", source: "Organic", status: "Contacted", score: 66, assigned: "Jane Doe" },
  { id: 7, name: "Priya Kapoor", from: "40001", to: "50002", source: "Facebook", status: "New", score: 73, assigned: "AI Bot" },
  { id: 8, name: "Carlos Mendes", from: "60001", to: "70001", source: "Referral", status: "Quoted", score: 84, assigned: "John Smith" },
];

/* ---------- Inline SVG icons ---------- */
const IconPhone = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 5.5l4.2 1.2a1 1 0 01.7.7l.9 3.2a1 1 0 01-.3.95L7.2 13a12 12 0 005.8 5.8l1.2-1.3a1 1 0 01.95-.3l3.2.9a1 1 0 01.7.7L20.5 21A2 2 0 0118.7 22C9.8 22 3 15.2 3 6.3A2 2 0 014 4.5z"/></svg>
);
const IconMail = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 8.5v7A2.5 2.5 0 005.5 18h13A2.5 2.5 0 0021 15.5v-7L12 13 3 8.5z"/><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 8.5L12 13 3 8.5"/></svg>
);
const IconPaperPlane = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13"/><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M22 2l-7 20 1-7 7-7-7 7"/></svg>
);
const IconPlus = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/></svg>
);
const IconFilter = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M22 5H2l8 7v7l4-2v-5l8-7z"/></svg>
);
const IconSort = ({ className = "w-3 h-3" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6-6 6 6M6 15l6 6 6-6"/></svg>
);

export default function Leads() {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState({ key: "name", dir: "asc" });
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [showAdd, setShowAdd] = useState(false);

  const statuses = useMemo(() => {
    const uniq = new Set(leads.map((l) => l.status));
    return ["All", ...Array.from(uniq)];
  }, [leads]);

  const filtered = useMemo(() => {
    let arr = [...leads];
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.source.toLowerCase().includes(q) ||
          l.from.includes(q) ||
          l.to.includes(q)
      );
    }
    if (statusFilter !== "All") {
      arr = arr.filter((l) => l.status === statusFilter);
    }
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
  }, [leads, query, statusFilter, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(key) {
    setSortKey((prev) => {
      if (prev.key === key) {
        return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
      }
      return { key, dir: "asc" };
    });
  }

  function handleAddLead(form) {
    const newLead = {
      id: leads.length + 1,
      name: form.name || `Lead ${Date.now() % 10000}`,
      from: form.from || "00000",
      to: form.to || "00000",
      source: form.source || "Manual",
      status: form.status || "New",
      score: Number(form.score || 50),
      assigned: form.assigned || "Unassigned",
    };
    setLeads((prev) => [newLead, ...prev]);
    setShowAdd(false);
    setPage(1);
  }

  function handleCall(lead) {
    alert(`Calling ${lead.name} (${lead.from} → ${lead.to})`);
  }
  function handleEmail(lead) {
    alert(`Open email composer for ${lead.name}`);
  }
  function handleSend(lead) {
    alert(`Send SMS/WhatsApp to ${lead.name}`);
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Leads</h1>
          <p className="text-sm text-slate-500">Manage and work your lead pipeline</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg shadow">
            <IconPlus className="w-4 h-4" /> <span className="text-sm">Add Lead</span>
          </button>
        </div>
      </header>

      {/* Controls */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="md:flex md:items-center md:gap-4">
          <div className="flex-1">
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search leads..."
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none"
            />
          </div>

          <div className="mt-3 md:mt-0 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm" onClick={() => {}}>
                <IconFilter /> Filters
              </button>

              <select value={statusFilter} onChange={(e)=>{ setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2 border rounded-lg text-sm">
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <div className="text-sm text-slate-500">Sort</div>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleSort("name")} className="px-2 py-2 border rounded text-sm">Name <IconSort className="inline-block ml-1" /></button>
                <button onClick={() => toggleSort("score")} className="px-2 py-2 border rounded text-sm">Score <IconSort className="inline-block ml-1" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table (desktop) / Cards (mobile) */}
      <div className="bg-white p-4 rounded-lg shadow">
        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-3">Name</th>
                <th className="py-3">From → To</th>
                <th className="py-3">Source</th>
                <th className="py-3">Status</th>
                <th className="py-3">Score</th>
                <th className="py-3">Assigned To</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 && (
                <tr><td colSpan="7" className="py-6 text-center text-slate-500">No leads found</td></tr>
              )}
              {pageData.map((lead) => (
                <tr key={lead.id} className="border-b hover:bg-slate-50">
                  <td className="py-4">{lead.name}</td>
                  <td className="py-4 text-slate-500">{lead.from} → {lead.to}</td>
                  <td className="py-4">{lead.source}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusPillClass(lead.status)}`}>{lead.status}</span>
                  </td>
                  <td className="py-4">
                    <div className="w-36">
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600" style={{ width: `${lead.score}%` }} />
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{lead.score}</div>
                    </div>
                  </td>
                  <td className="py-4">{lead.assigned}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleCall(lead)} className="p-2 rounded hover:bg-slate-100"><IconPhone /></button>
                      <button onClick={() => handleEmail(lead)} className="p-2 rounded hover:bg-slate-100"><IconMail /></button>
                      <button onClick={() => handleSend(lead)} className="p-2 rounded hover:bg-slate-100"><IconPaperPlane /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden space-y-3">
          {pageData.length === 0 && <div className="py-6 text-center text-slate-500">No leads found</div>}
          {pageData.map((lead) => (
            <div key={lead.id} className="p-3 border rounded-lg bg-[#fbfcfe]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-xs text-slate-500">{lead.from} → {lead.to}</div>
                </div>
                <div className="text-xs text-slate-500">{lead.score}</div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-slate-600">{lead.source} · <span className={`${statusPillClass(lead.status)} px-2 py-1 rounded-full`}>{lead.status}</span></div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <button onClick={() => handleCall(lead)} className="p-2 rounded hover:bg-slate-100"><IconPhone /></button>
                  <button onClick={() => handleEmail(lead)} className="p-2 rounded hover:bg-slate-100"><IconMail /></button>
                  <button onClick={() => handleSend(lead)} className="p-2 rounded hover:bg-slate-100"><IconPaperPlane /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-500">Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, filtered.length)} of {filtered.length}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded disabled:opacity-50" disabled={page === 1}>Prev</button>
            <div className="px-3 py-1 border rounded bg-white">{page}</div>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded disabled:opacity-50" disabled={page === totalPages}>Next</button>
          </div>
        </div>
      </div>

      {/* Add Lead Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAdd(false)} />
          <div className="relative bg-white rounded-lg p-6 w-full max-w-lg z-10 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Add Lead</h3>
            <AddLeadForm onCancel={() => setShowAdd(false)} onSubmit={(f) => handleAddLead(f)} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Small helper components ---------- */

function statusPillClass(status) {
  switch (status.toLowerCase()) {
    case "new": return "bg-sky-100 text-sky-800";
    case "contacted": return "bg-amber-100 text-amber-800";
    case "booked": return "bg-emerald-100 text-emerald-800";
    case "quoted": return "bg-violet-100 text-violet-800";
    default: return "bg-slate-100 text-slate-700";
  }
}

function AddLeadForm({ onCancel, onSubmit }) {
  const [form, setForm] = useState({
    name: "", from: "", to: "", source: "Manual", status: "New", score: 50, assigned: ""
  });

  function update(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-600 mb-1">Name</label>
          <input value={form.name} onChange={e => update("name", e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-slate-600 mb-1">Source</label>
          <select value={form.source} onChange={e => update("source", e.target.value)} className="w-full px-3 py-2 border rounded">
            <option>Manual</option><option>Google Ads</option><option>Facebook</option><option>Organic</option><option>Referral</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-600 mb-1">From (zip)</label>
          <input value={form.from} onChange={e => update("from", e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-slate-600 mb-1">To (zip)</label>
          <input value={form.to} onChange={e => update("to", e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-slate-600 mb-1">Status</label>
          <select value={form.status} onChange={e => update("status", e.target.value)} className="w-full px-3 py-2 border rounded">
            <option>New</option><option>Contacted</option><option>Booked</option><option>Quoted</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-600 mb-1">Score</label>
          <input type="number" value={form.score} onChange={e => update("score", e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-slate-600 mb-1">Assigned To</label>
          <input value={form.assigned} onChange={e => update("assigned", e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Lead</button>
      </div>
    </form>
  );
}
