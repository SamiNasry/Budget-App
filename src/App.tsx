import React, { useState, useEffect } from 'react';
import type { Budget, Transaction } from './types';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import BudgetSetup from './components/BudgetSetup';
import ExpenseList from './components/ExpenseList';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null); // Initialize as null
  const [showForm, setShowForm] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    const storedBudget = localStorage.getItem('budget');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
    if (storedBudget) {
      setBudget(JSON.parse(storedBudget));
    }
  }, []);

  // Save to localStorage when transactions or budget change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (budget) {
      localStorage.setItem('budget', JSON.stringify(budget));
    }
  }, [budget]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const updateTransaction = (id: string, updatedTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, ...updatedTransaction } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setShowForm(true);
  };

  // Show BudgetSetup if budget is not set
  if (!budget) {
    return <BudgetSetup onSubmit={setBudget} />;
  }

  return (
    <div className="app bg-gray-900 text-gray-100 min-h-screen">
      <Navbar onAddClick={() => setShowForm(true)} />
      <div className="container mx-auto p-4 space-y-6">
        <Dashboard
          transactions={transactions}
          budget={budget}
          onDelete={deleteTransaction}
        />
        <ExpenseList
          transactions={transactions}
          onDelete={deleteTransaction}
          onEdit={handleEditTransaction}
        />
        {showForm && (
          <ExpenseForm
            onAdd={addTransaction}
            onUpdate={updateTransaction}
            onClose={() => {
              setShowForm(false);
              setTransactionToEdit(null);
            }}
            transactionToEdit={transactionToEdit}
          />
        )}
      </div>
    </div>
  );
};

export default App;