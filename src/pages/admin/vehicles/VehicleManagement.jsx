import React, { useState, useEffect } from 'react';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicle_number: '',
    vehicle_type: 'bus',
    total_seats: ''
  });

  // Fetch vehicles
  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/ediniticketbooking/src/serveur/api/vehicles/list.php');
      const data = await response.json();
      if (data.success) {
        setVehicles(data.vehicles);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
    setLoading(false);
  };

  // Create vehicle
  const createVehicle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/ediniticketbooking/src/serveur/api/vehicles/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        fetchVehicles();
        setFormData({ vehicle_number: '', vehicle_type: 'bus', total_seats: '' });
        alert('Vehicle created successfully!');
      } else {
        alert(data.error || 'Failed to create vehicle');
      }
    } catch (error) {
      console.error('Error creating vehicle:', error);
      alert('Failed to create vehicle. Please try again.');
    }
};

  // Update vehicle status
  const updateVehicleStatus = async (vehicleId, newStatus) => {
    try {
      const response = await fetch('http://localhost/ediniticketbooking/src/serveur/api/vehicles/update.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicle_id: vehicleId,
          status: newStatus
        }),
      });
      const data = await response.json();
      if (data.success) {
        fetchVehicles();
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800 mt-20">Vehicle Management</h1>
      
      {/* Add Vehicle Form */}
      <form onSubmit={createVehicle} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Vehicle Number</label>
          <input
            type="text"
            value={formData.vehicle_number}
            onChange={(e) => setFormData({...formData, vehicle_number: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700">Vehicle Type</label>
          <select
            value={formData.vehicle_type}
            onChange={(e) => setFormData({...formData, vehicle_type: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
          >
            <option value="bus">Bus</option>
            <option value="taxi">Taxi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700">Total Seats</label>
          <input
            type="number"
            value={formData.total_seats}
            onChange={(e) => setFormData({...formData, total_seats: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
        >
          Add Vehicle
        </button>
      </form>

      {/* Vehicles List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Vehicle List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => (
              <div key={vehicle.vehicle_id} className="border p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold">{vehicle.vehicle_number}</h3>
                <p className="text-neutral-600">Type: {vehicle.vehicle_type}</p>
                <p className="text-neutral-600">Total Seats: {vehicle.total_seats}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    vehicle.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {vehicle.status}
                  </span>
                  <button
                    onClick={() => updateVehicleStatus(vehicle.vehicle_id, 
                      vehicle.status === 'active' ? 'inactive' : 'active')}
                    className="text-sm text-red hover:text-red-600"
                  >
                    Toggle Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleManagement;