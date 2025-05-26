import React, { useState, useEffect } from 'react';
import type { TransactionType, Transaction } from '../types';

interface ExpenseFormProps {
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
  onUpdate?: (id: string, updatedTransaction: Omit<Transaction, 'id'>) => void;
  onClose: () => void;
  transactionToEdit?: Transaction | null;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onAdd,
  onUpdate,
  onClose,
  transactionToEdit,
}) => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('Food');
  const [customCategory, setCustomCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = ['Food', 'Transport', 'Housing', 'Entertainment', 'Utilities', 'Healthcare', 'Other', 'Custom'];

  // Pre-fill form if editing a transaction
  useEffect(() => {
    if (transactionToEdit) {
      setAmount(transactionToEdit.amount.toString());
      setType(transactionToEdit.type);
      setCategory(transactionToEdit.category);
      setDate(transactionToEdit.date);
    }
  }, [transactionToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = category === 'Custom' ? customCategory : category;

    const transactionData = {
      amount: parseFloat(amount),
      type,
      category: finalCategory,
      description: '', // Simplified: No description field
      date,
    };

    if (transactionToEdit && onUpdate) {
      onUpdate(transactionToEdit.id, transactionData); // Update the transaction
    } else {
      onAdd(transactionData); // Add a new transaction
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-100">
          {transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter amount"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as TransactionType)}
              className="w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {category === 'Custom' && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter custom category"
                className="mt-2 w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {transactionToEdit ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;