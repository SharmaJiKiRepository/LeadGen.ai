import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { leadsVsBookingsData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white p-3 shadow-lg">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-sm text-blue-500">{`Leads: ${payload[0].value}`}</p>
        <p className="text-sm text-green-500">{`Bookings: ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

const LeadsVsBookingsChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={leadsVsBookingsData}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: '3 3' }}/>
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => <span className="text-gray-600">{value}</span>}
        />
        <Line type="monotone" dataKey="Leads" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="Bookings" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LeadsVsBookingsChart;