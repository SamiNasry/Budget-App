import React from 'react';

interface NavbarProps {
  onAddClick: () => void;
  onExportClick: () => void; // Add this prop
}

const Navbar: React.FC<NavbarProps> = ({ onAddClick, onExportClick }) => {
  return (
    <nav className="bg-gray-800 text-gray-100 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budget App</h1>
        <div className="flex gap-2">
          <button
            onClick={onExportClick}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Export to PDF
          </button>
          <button
            onClick={onAddClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Transaction
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;