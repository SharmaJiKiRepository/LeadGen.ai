import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { aiVsHumanData, AI_VS_HUMAN_COLORS } from '../../data/mockData';

const AiVsHumanChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={aiVsHumanData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          labelLine={false}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text x={x} y={y} fill="#4b5563" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
              </text>
            );
          }}
        >
          {aiVsHumanData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={AI_VS_HUMAN_COLORS[index % AI_VS_HUMAN_COLORS.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => <span className="text-gray-600">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AiVsHumanChart;