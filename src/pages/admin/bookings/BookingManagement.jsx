import React, { useState, useEffect } from 'react';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/ediniticketbooking/src/serveur/api/bookings/list.php');
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
    setLoading(false);
  };

  // Update booking status
  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch('http://localhost/ediniticketbooking/src/serveur/api/bookings/update.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: bookingId,
          status: newStatus
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        fetchBookings();
        alert('Booking status updated successfully!');
      } else {
        alert(data.error || 'Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking status. Please try again.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800 mt-20">Booking Management</h1>

      {/* Bookings List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Bookings List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div key={booking.booking_id} className="border p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold">
                    Booking #{booking.booking_id}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Passenger:</span> {booking.first_name} {booking.last_name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Route:</span> {booking.departure_location} → {booking.arrival_location}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Departure:</span> {new Date(booking.departure_time).toLocaleString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Seats:</span> {booking.seat_numbers}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Amount:</span> ${booking.total_amount}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Payment Status:</span>{' '}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                      booking.payment_status === 'refunded' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.payment_status}
                    </span>
                  </p>
                </div>

                <div className="mt-4 border-t pt-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Update Status</label>
                  <select
                    value={booking.status}
                    onChange={(e) => updateBookingStatus(booking.booking_id, e.target.value)}
                    className="w-full rounded-md border-neutral-300 shadow-sm focus:border-red focus:ring-red"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;