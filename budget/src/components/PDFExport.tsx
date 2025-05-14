import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import type { Transaction } from '../types';

interface PDFExportProps {
  transactions: Transaction[];
  onClose?: () => void;
}

const PDFExport: React.FC<PDFExportProps> = ({ transactions, onClose }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    getContent: () => {
      console.log("componentRef.current:", componentRef.current);
      return componentRef.current;
    },
    documentTitle: 'Budget Report',
    pageStyle: `
      @page { size: A4; margin: 1cm; }
      body { background: #fff !important; color: #000 !important; }
      .no-print { display: none; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #333; padding: 8px; }
      th { background: #eee; }
    `,
  });

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative" style={{ color: "#000" }}>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 no-print"
          >
            ✕
          </button>
        )}
        <button
          onClick={handlePrint}
          className="no-print mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Open Print Dialog
        </button>
        <p className="no-print text-sm text-gray-600">
          Use your browser's print dialog to save as PDF.
        </p>
        {/* Only this div will be printed */}
        <div ref={componentRef} style={{ background: "#fff", color: "#000", padding: 20 }}>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Budget Report</h1>
          <p style={{ marginBottom: 16 }}>Generated on: {new Date().toLocaleDateString()}</p>
          <h2 style={{ fontSize: 22, margin: "16px 0 8px" }}>Summary</h2>
          <p>Total Income: <b>${totalIncome.toFixed(2)}</b></p>
          <p>Total Expenses: <b>${totalExpenses.toFixed(2)}</b></p>
          <p>Balance: <b>${(totalIncome - totalExpenses).toFixed(2)}</b></p>
          <h2 style={{ fontSize: 22, margin: "24px 0 8px" }}>Transaction Details</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>No transactions found.</td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id}>
                    <td>{new Date(t.date).toLocaleDateString()}</td>
                    <td style={{ textTransform: "capitalize" }}>{t.type}</td>
                    <td>{t.category}</td>
                    <td>{t.description || '-'}</td>
                    <td>${t.amount.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PDFExport;
