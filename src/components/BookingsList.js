import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/list.php`);
      const data = await response.json();
      
      if (data.success) {
        setBookings(data.bookings);
      } else {
        setError(data.error || 'Failed to fetch bookings');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  // Add periodic refresh
  useEffect(() => {
    fetchBookings();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchBookings, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-4">
      {loading && <div>Loading...</div>}
      {error && <div className="text-red">{error}</div>}
      
      {bookings.map(booking => (
        <div key={booking.booking_id} className="border rounded-lg p-4">
          <div className="flex justify-between">
            <div>
              <h3>From: {booking.from_location}</h3>
              <h3>To: {booking.to_location}</h3>
              <p>Departure: {new Date(booking.departure_time).toLocaleString()}</p>
              <p>Arrival: {new Date(booking.arrival_time).toLocaleString()}</p>
            </div>
            <div>
              <p>Seat Number: {booking.seat_numbers}</p>
              <p>Price: {booking.price} DA</p>
              <p>Status: {booking.status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;