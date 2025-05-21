import React, { useState, useEffect } from 'react';

const ScheduleManagement = () => {
  const [schedules, setSchedules] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    route_id: '',
    vehicle_id: '',
    departure_time: '',
    arrival_time: '',
    price: '',
    available_seats: ''
  });

  // Fetch schedules
  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost/ediniticketbooking/src/serveur/api/schedules/list.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Schedules response:', data); // Add this for debugging
      
      if (data.success) {
        setSchedules(data.schedules);
      } else {
        console.error('API Error:', data.error);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [routesResponse, vehiclesResponse] = await Promise.all([
          fetch('http://localhost/ediniticketbooking/src/serveur/api/routes/list.php'),
          fetch('http://localhost/ediniticketbooking/src/serveur/api/vehicles/list.php')
        ]);
        
        const routesData = await routesResponse.json();
        const vehiclesData = await vehiclesResponse.json();
        
        if (routesData.success) setRoutes(routesData.routes);
        if (vehiclesData.success) setVehicles(vehiclesData.vehicles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
    fetchSchedules();
  }, []);

  const createSchedule = async (e) => {
    e.preventDefault();
    
    // Validate form data before sending
    if (!formData.route_id || !formData.vehicle_id) {
      alert('Please select both route and vehicle');
      return;
    }

    try {
      // Format the data properly before sending
      const scheduleData = {
        route_id: parseInt(formData.route_id, 10), // Ensure it's a number
        vehicle_id: parseInt(formData.vehicle_id, 10), // Ensure it's a number
        departure_time: formData.departure_time.replace('T', ' '), // Convert to MySQL datetime format
        arrival_time: formData.arrival_time.replace('T', ' '), // Convert to MySQL datetime format
        price: parseFloat(formData.price),
        available_seats: parseInt(formData.available_seats, 10)
      };

      const response = await fetch('http://localhost/ediniticketbooking/src/serveur/api/schedules/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });
      
      const data = await response.json();
      if (data.success) {
        fetchSchedules();
        setFormData({
          route_id: '',
          vehicle_id: '',
          departure_time: '',
          arrival_time: '',
          price: '',
          available_seats: ''
        });
        alert('Schedule created successfully!');
      } else {
        alert(data.error || 'Failed to create schedule');
      }
    } catch (error) {
      console.error('Error creating schedule:', error);
      alert('Failed to create schedule. Please try again.');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800 mt-20">Schedule Management</h1>
      
      {/* Add Schedule Form */}
      <form onSubmit={createSchedule} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Route</label>
          <select
            value={formData.route_id}
            onChange={(e) => setFormData({...formData, route_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
            required
          >
            <option value="">Select a route</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.from_location} to {route.to_location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700">Vehicle</label>
          <select
            value={formData.vehicle_id}
            onChange={(e) => setFormData({...formData, vehicle_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
            required
          >
            <option value="">Select a vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.vehicle_number} ({vehicle.vehicle_type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700">Departure Time</label>
          <input
            type="datetime-local"
            value={formData.departure_time}
            onChange={(e) => setFormData({...formData, departure_time: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700">Arrival Time</label>
          <input
            type="datetime-local"
            value={formData.arrival_time}
            onChange={(e) => setFormData({...formData, arrival_time: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700">Price</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700">Available Seats</label>
          <input
            type="number"
            value={formData.available_seats}
            onChange={(e) => setFormData({...formData, available_seats: e.target.value})}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Add Schedule
        </button>
      </form>

      {/* Display Schedules */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Schedules List</h2>
        <div className="grid gap-4">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="border p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {schedule.from_location} → {schedule.to_location}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Vehicle: {schedule.vehicle_number} ({schedule.vehicle_type})
                  </p>
                  <p className="text-sm text-gray-600">
                    Departure: {new Date(schedule.departure_time).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Arrival: {new Date(schedule.arrival_time).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Price: {schedule.price} DA</p>
                  <p>Available Seats: {schedule.available_seats}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagement;