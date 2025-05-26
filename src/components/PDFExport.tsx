import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import type { Transaction } from '../types';
import Charts from './Charts';

interface PDFExportProps {
  transactions: Transaction[];
}

const PDFExport: React.FC<PDFExportProps> = ({ transactions }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: 'print-body',
    pageStyle: `
      @page { size: A4; margin: 1cm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none; }
      }
    `,
  });

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <button onClick={handlePrint} className="no-print">
        Export to PDF
      </button>
      
      <div ref={componentRef} style={{ display: 'none' }}>
        <div style={{ padding: '20px' }}>
          <h1>Budget Report</h1>
          <p>Generated on: {new Date().toLocaleDateString()}</p>
          
          <h2>Summary</h2>
          <p>Total Income: ${totalIncome.toFixed(2)}</p>
          <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
          <p>Balance: ${(totalIncome - totalExpenses).toFixed(2)}</p>
          
          <h2>Charts</h2>
          <Charts transactions={transactions} />
          
          <h2>Transaction Details</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{t.type}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{t.category}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{t.description}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    ${t.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PDFExport;
