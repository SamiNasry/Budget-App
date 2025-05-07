import React from 'react';
import type { Transaction, Budget } from '../types';
import BudgetOverview from './BudgetOverview';
import Charts from './Charts';

interface DashboardProps {
  transactions: Transaction[];
  budget: Budget;
  onDelete: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, budget, onDelete }) => {
  return (
    <div className="dashboard space-y-6">
      <BudgetOverview transactions={transactions} budget={budget} />
      <Charts transactions={transactions} />
    </div>
  );
};

export default Dashboard;