import React from 'react';
import '../styles/VisualInsights.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Stocks', value: 50 },
  { name: 'Crypto', value: 30 },
  { name: 'Cash', value: 20 },
];

const COLORS = ['#00c896', '#0072ff', '#ffa500'];

function VisualInsights() {
  return (
    <section className="visual-insights">
      <h2>Portfolio Allocation</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default VisualInsights;
