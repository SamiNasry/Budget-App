import React, { useState } from 'react';
import type { Budget } from '../types';

interface BudgetSetupProps {
  onSubmit: (budget: Budget) => void;
}

const BudgetSetup: React.FC<BudgetSetupProps> = ({ onSubmit }) => {
  const [monthlyLimit, setMonthlyLimit] = useState('');
  const [maxExpense, setMaxExpense] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      monthlyLimit: parseFloat(monthlyLimit),
      maxExpense: parseFloat(maxExpense),
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Set Your Budget</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Your Starting Budget</label>
            <input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
              required
              className="w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Maximum Daily Expense Warning</label>
            <input
              type="number"
              value={maxExpense}
              onChange={(e) => setMaxExpense(e.target.value)}
              required
              className="w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetSetup;