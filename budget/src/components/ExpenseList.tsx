// src/components/ExpenseList.tsx
import React from 'react';
import type { Transaction } from '../types';

interface ExpenseListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void; // Ensure onEdit is defined
}

const ExpenseList: React.FC<ExpenseListProps> = ({ transactions, onDelete, onEdit }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
        <table className="min-w-full text-left text-gray-300">
          <thead className="bg-gray-700 text-gray-400">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                } hover:bg-gray-600`}
              >
                <td className="px-6 py-4">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 capitalize">{transaction.type}</td>
                <td className="px-6 py-4">{transaction.category}</td>
                <td
                  className={`px-6 py-4 font-bold ${
                    transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => onEdit(transaction)} // Call onEdit with the transaction
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;