import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const BookingForm = () => {
    const [schedules, setSchedules] = useState([]);
    const [formData, setFormData] = useState({
        passenger_id: 1, // Get from user context/session
        schedule_id: '',
        seat_numbers: '',
        total_amount: ''
    });

    useEffect(() => {
        // Fetch available schedules
        const fetchSchedules = async () => {
            try {
                const response = await api.getSchedules();
                if (response.success) {
                    setSchedules(response.schedules);
                }
            } catch (error) {
                console.error('Failed to fetch schedules:', error);
            }
        };
        fetchSchedules();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.createBooking(formData);
            if (response.success) {
                alert('Booking created successfully!');
                // Handle success (redirect or update UI)
            } else {
                alert(response.error || 'Failed to create booking');
            }
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select 
                value={formData.schedule_id}
                onChange={(e) => {
                    const schedule = schedules.find(s => s.schedule_id === e.target.value);
                    setFormData({
                        ...formData,
                        schedule_id: e.target.value,
                        total_amount: schedule ? schedule.price : ''
                    });
                }}
            >
                <option value="">Select a schedule</option>
                {schedules.map(schedule => (
                    <option key={schedule.schedule_id} value={schedule.schedule_id}>
                        {schedule.from_location} to {schedule.to_location} - {schedule.departure_time}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Seat Number (e.g., A1)"
                value={formData.seat_numbers}
                onChange={(e) => setFormData({...formData, seat_numbers: e.target.value})}
            />

            <button type="submit">Book Now</button>
        </form>
    );
};

export default BookingForm;