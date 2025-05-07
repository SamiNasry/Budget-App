import React from 'react';

interface NavbarProps {
  onAddClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddClick }) => {
  return (
    <nav className="bg-gray-800 text-gray-100 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budget App</h1>
        <button
          onClick={onAddClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Transaction
        </button>
      </div>
    </nav>
  );
};

export default Navbar;