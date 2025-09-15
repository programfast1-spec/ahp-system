import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface ChartData {
  name: string;
  weight: number;
  score?: number;
}

interface AHPResultChartProps {
  data: ChartData[];
  type: 'bar' | 'radar';
  title: string;
}

const AHPResultChart: React.FC<AHPResultChartProps> = ({ data, type, title }) => {
  if (type === 'radar') {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 'dataMax']}
              tick={{ fontSize: 10 }}
            />
            <Radar
              name="Bobot"
              dataKey="weight"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
            />
            {data.some(item => item.score !== undefined) && (
              <Radar
                name="Skor"
                dataKey="score"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
              />
            )}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number, name: string) => [
              `${(value * 100).toFixed(2)}%`,
              name === 'weight' ? 'Bobot' : 'Skor'
            ]}
          />
          <Legend />
          <Bar
            dataKey="weight"
            fill="#3B82F6"
            name="Bobot"
            radius={[4, 4, 0, 0]}
          />
          {data.some(item => item.score !== undefined) && (
            <Bar
              dataKey="score"
              fill="#10B981"
              name="Skor"
              radius={[4, 4, 0, 0]}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AHPResultChart;