import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Total Vehicles</h3>
          <p className="text-2xl font-bold text-gray-800">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Active Routes</h3>
          <p className="text-2xl font-bold text-gray-800">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Today's Bookings</h3>
          <p className="text-2xl font-bold text-gray-800">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-800">$0</p>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-500">No recent activity</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;