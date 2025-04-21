import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Función para obtener el token de autenticación
const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Servicio para las reservas
const bookingService = {
  // Obtener todas las reservas del usuario actual (requiere autenticación)
  getUserBookings: async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings/user`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener reservas del usuario:', error);
      throw error;
    }
  },

  // Obtener una reserva por ID (requiere autenticación)
  getBookingById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/${id}`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error(`Error al obtener reserva con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva reserva (requiere autenticación)
  createBooking: async (bookingData) => {
    try {
      const response = await axios.post(`${API_URL}/bookings`, bookingData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear reserva:', error);
      throw error;
    }
  },

  // Actualizar una reserva (requiere autenticación)
  updateBooking: async (id, bookingData) => {
    try {
      const response = await axios.put(`${API_URL}/bookings/${id}`, bookingData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar reserva con ID ${id}:`, error);
      throw error;
    }
  },

  // Cancelar una reserva (requiere autenticación)
  cancelBooking: async (id) => {
    try {
      const response = await axios.put(`${API_URL}/bookings/${id}/cancel`, {}, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error(`Error al cancelar reserva con ID ${id}:`, error);
      throw error;
    }
  }
};

export default bookingService; 