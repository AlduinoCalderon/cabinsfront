// ../src/services/api.js

const API_URL = 'https://server-http-mfxe.onrender.com';

export const fetchBookings = async () => {
    const response = await fetch(`${API_URL}/bookings`);
    return await response.json();
};

export const fetchCabins = async () => {
    const response = await fetch(`${API_URL}/cabins`);
    return await response.json();
};

export const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    return await response.json();
};

export const createBooking = async (booking) => {
    const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    });
    return await response.json();
};

export const updateBooking = async (id, booking) => {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    });
    return await response.json();
};
