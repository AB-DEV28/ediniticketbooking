import React, { useState, useEffect } from 'react';

const RouteManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    from_location: '',
    to_location: '',
    distance: '',
    estimated_time: ''
  });

  // Fetch routes
  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/ediniticketbooking/src/serveur/api/routes/list.php');
      const data = await response.json();
      if (data.success) {
        setRoutes(data.routes);
      }
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
    setLoading(false);
  };

  // Create route
  const createRoute = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/ediniticketbooking/src/serveur/api/routes/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_location: formData.from_location,
          to_location: formData.to_location,
          distance: formData.distance,
          estimated_time: formData.estimated_time
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        fetchRoutes();
        setFormData({ from_location: '', to_location: '', distance: '', estimated_time: '' });
        alert('Route created successfully!');
      } else {
        alert(data.error || 'Failed to create route');
      }
    } catch (error) {
      console.error('Error creating route:', error);
      alert('Failed to create route. Please try again.');
    }
  };

  // Update route function
  const updateRoute = async (routeId, updatedData) => {
    try {
      const response = await fetch('http://localhost/ediniticketbooking/src/serveur/api/routes/update.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: routeId,
          from_location: updatedData.from_location,
          to_location: updatedData.to_location,
          distance: updatedData.distance,
          estimated_time: updatedData.estimated_time
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        fetchRoutes();
        alert('Route updated successfully!');
      } else {
        alert(data.error || 'Failed to update route');
      }
    } catch (error) {
      console.error('Error updating route:', error);
      alert('Failed to update route. Please try again.');
    }
  };

  // Add deleteRoute function (frontend only)
  const deleteRoute = async (routeId) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      // Remove the route from local state
      setRoutes(routes.filter(route => route.id !== routeId));
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800">Route Management</h1>
      
      {/* Add Route Form */}
      <form onSubmit={createRoute} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-neutral-700">From Location</label>
          <input
            type="text"
            value={formData.from_location}
            onChange={(e) => setFormData({...formData, from_location: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700">To Location</label>
          <input
            type="text"
            value={formData.to_location}
            onChange={(e) => setFormData({...formData, to_location: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700">Distance (km)</label>
          <input
            type="number"
            step="0.01"
            value={formData.distance}
            onChange={(e) => setFormData({...formData, distance: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700">Estimated Time (minutes)</label>
          <input
            type="number"
            value={formData.estimated_time}
            onChange={(e) => setFormData({...formData, estimated_time: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
          />
        </div>

        <button
          type="submit"
          className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
        >
          Add Route
        </button>
      </form>

      {/* Routes List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Routes List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map((route) => (
              <div key={route.id} className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-neutral-800">
                    {route.from_location} 
                    <span className="mx-2">→</span> 
                    {route.to_location}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const newFromLocation = prompt('Enter new from location:', route.from_location);
                        const newToLocation = prompt('Enter new to location:', route.to_location);
                        const newDistance = prompt('Enter new distance (km):', route.distance);
                        const newEstimatedTime = prompt('Enter new estimated time (minutes):', route.estimated_time);
                        
                        if (newFromLocation && newToLocation && newDistance && newEstimatedTime) {
                          updateRoute(route.id, {
                            from_location: newFromLocation,
                            to_location: newToLocation,
                            distance: parseFloat(newDistance),
                            estimated_time: parseInt(newEstimatedTime)
                          });
                        }
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteRoute(route.id)}
                      className="text-sm text-red-600 hover:text-red-800 px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-neutral-600">
                    <span className="font-medium">Distance:</span> {route.distance} km
                  </p>
                  <p className="text-neutral-600">
                    <span className="font-medium">Estimated Time:</span> {route.estimated_time} minutes
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteManagement;