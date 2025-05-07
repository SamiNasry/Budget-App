import React from 'react';
import type { Transaction, Budget } from '../types';
import sumBy from 'lodash/sumBy';

interface AlertsProps {
  transactions: Transaction[];
  budget: Budget;
}

const Alerts: React.FC<AlertsProps> = ({ transactions, budget }) => {
  const totalExpenses = sumBy(
    transactions.filter((t) => t.type === 'expense'),
    'amount'
  );
  const isOverBudget = totalExpenses > budget.monthlyLimit;
  const isOverMaxExpense = totalExpenses > budget.maxExpense;

  if (!isOverBudget && !isOverMaxExpense) return null;

  return (
    <div className="alerts space-y-4">
      {isOverBudget && (
        <div className="alert alert-danger">
          Warning: You've exceeded your monthly budget!
        </div>
      )}
      {isOverMaxExpense && (
        <div className="alert alert-warning">
          Warning: Your expenses have exceeded the maximum expense limit!
        </div>
      )}
    </div>
  );
};

export default Alerts;