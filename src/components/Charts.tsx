import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Transaction } from '../types';
import { groupBy, sumBy } from 'lodash';

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const Charts: React.FC<ChartsProps> = ({ transactions }) => {
  // Prepare data for category spending chart
  const categoryData = Object.entries(
    groupBy(transactions.filter(t => t.type === 'expense'), 'category')
  ).map(([name, items]) => ({
    name,
    value: sumBy(items, 'amount')
  }));

  // Prepare data for monthly spending chart
  const monthlyData = Object.entries(
    groupBy(transactions.filter(t => t.type === 'expense'), t => new Date(t.date).toLocaleString('default', { month: 'short' }))
  ).map(([name, items]) => ({
    name,
    amount: sumBy(items, 'amount')
  }));

  return (
    <div className="charts-container">
      {/* Expenses by Category */}
      <div className="chart">
        <h3 className="text-gray-300 mb-4">Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              isAnimationActive={true} // Enable animations
            >
              {categoryData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip cursor={{ fill: 'transparent' }} /> {/* Keep tooltip but disable hover effects */}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Expenses */}
      <div className="chart">
        <h3 className="text-gray-300 mb-4">Monthly Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={{ fill: 'transparent' }} /> {/* Keep tooltip but disable hover effects */}
            <Bar
              dataKey="amount"
              fill="#8884d8"
              name="Amount spent"
              isAnimationActive={true} // Enable animations
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;