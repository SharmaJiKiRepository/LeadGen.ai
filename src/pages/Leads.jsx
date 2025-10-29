import React from 'react';

const SAMPLE = [
  { id: '90210', name: 'Sarah Johnson', source: 'Facebook', status: 'New', email: 'sarah@example.com' },
  { id: '94012', name: 'Mike Chen', source: 'Google Ads', status: 'Contacted', email: 'mike@example.com' },
  { id: '33101', name: 'Emily Rodriguez', source: 'Website', status: 'Booked', email: 'emily@example.com' },
];

export default function Leads() {
  const [q, setQ] = React.useState('');
  const filtered = SAMPLE.filter((l) => l.name.toLowerCase().includes(q.toLowerCase()) || l.id.includes(q));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">Leads</div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or ID"
          className="px-3 py-2 rounded-md border border-slate-200 text-sm"
        />
      </div>
      <div className="overflow-auto">
        <table className="min-w-[700px] w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Lead ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Source</th>
              <th className="py-2">Status</th>
              <th className="py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-t border-slate-200">
                <td className="py-2 font-mono text-slate-700">{l.id}</td>
                <td className="py-2">{l.name}</td>
                <td className="py-2">{l.source}</td>
                <td className="py-2">
                  <span className={
                    'px-2 py-1 rounded-full text-xs ' +
                    (l.status === 'Booked' ? 'bg-emerald-100 text-emerald-700' : l.status === 'Contacted' ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-700')
                  }>
                    {l.status}
                  </span>
                </td>
                <td className="py-2 text-slate-600">{l.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


