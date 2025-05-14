import React from 'react';
import type { Transaction } from '../types';

interface AlertsProps {
  transactions: Transaction[];
  maxExpense: number;
}

const Alerts: React.FC<AlertsProps> = ({ transactions, maxExpense }) => {
  // Check if any transaction exceeds the maxExpense limit
  const isOverMaxExpense = transactions.some(
    (transaction) => transaction.type === 'expense' && transaction.amount > maxExpense
  );

  // Debugging: Log transactions and maxExpense
  console.log('Transactions:', transactions);
  console.log('Max Expense Limit:', maxExpense);
  console.log('Is Over Max Expense:', isOverMaxExpense);

  return (
    <div>
      {isOverMaxExpense && (
        <div className="bg-red-500 text-white p-4 rounded-lg">
          Warning: One or more transactions exceed the maximum daily expense limit of ${maxExpense}.
        </div>
      )}
    </div>
  );
};

export default Alerts;