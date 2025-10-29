import React from 'react';
import { ArrowTrendingUpIcon, PhoneIcon, UsersIcon, BanknotesIcon } from '@heroicons/react/24/solid';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [tab, setTab] = React.useState('All');
  const [range, setRange] = React.useState('30d'); // '7d' | '30d' | '90d'
  const [showLeads, setShowLeads] = React.useState(true);
  const [showBookings, setShowBookings] = React.useState(true);

  const chartLabels = React.useMemo(() => {
    if (range === '7d') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    if (range === '90d') return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  }, [range]);

  const leadsData = React.useMemo(() => {
    if (range === '7d') return [42, 51, 39, 60, 55, 62, 70];
    if (range === '90d') return [220, 260, 310, 305, 350, 410];
    return [245, 260, 310, 305, 350, 410];
  }, [range]);

  const bookingsData = React.useMemo(() => {
    if (range === '7d') return [14, 18, 12, 22, 25, 28, 30];
    if (range === '90d') return [85, 110, 130, 135, 155, 195];
    return [89, 120, 135, 140, 160, 200];
  }, [range]);
  const items = [
    { name: 'Sarah Johnson', note: 'Likely to book. Needs quote for 3BR move.', type: 'AI' },
    { name: 'Mike Chen', note: 'Requested call back tomorrow at 2 P.M.', type: 'Human' },
    { name: 'Emily Rodriguez', note: 'Booked next week. Full-service selected.', type: 'AI' },
  ];
  const filtered = tab === 'All' ? items : items.filter((i) => i.type === tab);

  return (
    <>
      {/* KPI Row */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Leads Received', value: '641', delta: '+28%', Icon: UsersIcon, color: 'bg-sky-100 text-sky-600' },
          { label: 'Contact Rate', value: '87%', delta: '+5%', Icon: PhoneIcon, color: 'bg-emerald-100 text-emerald-600' },
          { label: 'Bookings', value: '234', delta: '+13%', Icon: ArrowTrendingUpIcon, color: 'bg-indigo-100 text-indigo-600' },
          { label: 'ROI', value: '342%', delta: '+12%', Icon: BanknotesIcon, color: 'bg-violet-100 text-violet-600' },
        ].map(({ label, value, delta, Icon, color }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-card transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`w-8 h-8 rounded-md grid place-items-center ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">{delta}</span>
            </div>
            <div className="mt-3 text-xs text-slate-500">{label}</div>
            <div className="text-2xl font-semibold mt-1">{value}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-3">
          <div className="flex items-center justify-between pb-2">
            <div className="text-sm text-slate-600">Leads vs Bookings</div>
            <div className="flex items-center gap-2 text-xs">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="border border-slate-200 rounded-md px-2 py-1"
              >
                <option value="7d">7d</option>
                <option value="30d">30d</option>
                <option value="90d">90d</option>
              </select>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={showLeads} onChange={(e) => setShowLeads(e.target.checked)} />
                Leads
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={showBookings} onChange={(e) => setShowBookings(e.target.checked)} />
                Bookings
              </label>
            </div>
          </div>
          <div className="h-[320px] md:h-[360px]">
            <Line
              data={{
                labels: chartLabels,
                datasets: [
                  showLeads
                    ? {
                        label: 'Leads',
                        data: leadsData,
                        borderColor: '#0284c7',
                        backgroundColor: 'rgba(2,132,199,0.15)',
                        fill: true,
                        tension: 0.35,
                        pointRadius: 2,
                      }
                    : null,
                  showBookings
                    ? {
                        label: 'Bookings',
                        data: bookingsData,
                        borderColor: '#22c55e',
                        backgroundColor: 'rgba(34,197,94,0.15)',
                        fill: true,
                        tension: 0.35,
                        pointRadius: 2,
                      }
                    : null,
                ].filter(Boolean),
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: '#eef2f7' }, ticks: { precision: 0 } },
                },
              }}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <Pie
            data={{
              labels: ['AI Handled', 'Human Handled'],
              datasets: [
                { data: [68, 32], backgroundColor: ['#7c3aed', '#a78bfa'], borderWidth: 0 },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom' } },
            }}
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="font-semibold mb-2">Quick Actions</div>
          <div className="grid gap-2">
            <button className="px-3 py-2 rounded-md text-left bg-sky-500 text-white">Start Dialer</button>
            <button className="px-3 py-2 rounded-md text-left bg-green-500 text-white">Create AI Agent</button>
            <button className="px-3 py-2 rounded-md text-left bg-indigo-500 text-white">Buy Leads</button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">Recent Activity</div>
            <div className="flex items-center gap-2 text-sm">
              {['All', 'AI', 'Human'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={
                    'px-2 py-1 rounded-md border border-slate-200 hover:bg-slate-50 ' +
                    (tab === t ? 'bg-slate-100' : '')
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            {filtered.map((i) => (
              <div key={i.name} className="flex items-center justify-between p-3 rounded-md border border-slate-200">
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="text-sm text-slate-600">{i.note}</div>
                </div>
                <span className="text-xs text-slate-600 border border-slate-200 px-2 py-1 rounded-full">{i.type} Summary</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


