// src/components/BudgetOverview.tsx
import React from 'react';
import type { Transaction, Budget } from '../types';
import sumBy from 'lodash/sumBy';

interface BudgetOverviewProps {
  transactions: Transaction[];
  budget: Budget;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ transactions, budget }) => {
  const totalExpenses = sumBy(
    transactions.filter((t) => t.type === 'expense'),
    'amount'
  );
  const remainingBudget = budget.monthlyLimit - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Monthly Limit Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4">
        <div className="bg-blue-600 text-white p-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"
            />
          </svg>
        </div>
        <div>
          <p className="text-gray-400">Monthly Limit</p>
          <p className="text-2xl font-bold text-gray-100">${budget.monthlyLimit.toFixed(2)}</p>
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4">
        <div className="bg-red-600 text-white p-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"
            />
          </svg>
        </div>
        <div>
          <p className="text-gray-400">Total Expenses</p>
          <p className="text-2xl font-bold text-red-400">${totalExpenses.toFixed(2)}</p>
        </div>
      </div>

      {/* Remaining Budget Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4">
        <div
          className={`${
            remainingBudget >= 0 ? 'bg-green-600' : 'bg-red-600'
          } text-white p-4 rounded-full`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"
            />
          </svg>
        </div>
        <div>
          <p className="text-gray-400">Remaining Budget</p>
          <p
            className={`text-2xl font-bold ${
              remainingBudget >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            ${remainingBudget.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;