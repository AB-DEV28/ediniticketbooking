import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: '📊' },
    { path: '/admin/vehicles', name: 'Vehicles', icon: '🚌' },
    { path: '/admin/routes', name: 'Routes', icon: '🛣️' },
    { path: '/admin/schedules', name: 'Schedules', icon: '📅' },
    { path: '/admin/bookings', name: 'Bookings', icon: '🎫' }
  ];

  return (
    <div className="bg-white w-64 h-screen shadow-lg">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-red">Admin Panel</h2>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-red hover:text-white transition-colors ${
              location.pathname === item.path ? 'bg-red text-white' : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;