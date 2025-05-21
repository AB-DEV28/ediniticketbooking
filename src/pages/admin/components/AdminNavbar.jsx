import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white h-16 shadow-sm flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">Edini Ticket Booking</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-gray-600 hover:text-red"
        >
          View Site
        </button>
        <button
          onClick={() => {
            // Add logout logic here
            navigate('/login');
          }}
          className="px-4 py-2 bg-red text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;