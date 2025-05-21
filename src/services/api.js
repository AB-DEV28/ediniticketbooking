const API_BASE_URL = 'http://localhost/ediniticketbooking/src/serveur/api';

export const api = {
    // Auth endpoints
    signup: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/signup.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    },

    // Vehicles endpoints
    getVehicles: async () => {
        const response = await fetch(`${API_BASE_URL}/vehicles/list.php`);
        return response.json();
    },

    // Routes endpoints
    getRoutes: async () => {
        const response = await fetch(`${API_BASE_URL}/routes/list.php`);
        return response.json();
    },

    // Schedules endpoints
    getSchedules: async (filters = {}) => {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE_URL}/schedules/list.php?${params}`);
        return response.json();
    },

    // Bookings endpoints
    createBooking: async (bookingData) => {
        const response = await fetch(`${API_BASE_URL}/bookings/create.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });
        return response.json();
    },

    getBookings: async (filters = {}) => {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE_URL}/bookings/list.php?${params}`);
        return response.json();
    },

    updateBooking: async (bookingData) => {
        const response = await fetch(`${API_BASE_URL}/bookings/update.php`, {
            method: 'POST', // Changed from PUT to POST as per your API
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });
        return response.json();
    }
};