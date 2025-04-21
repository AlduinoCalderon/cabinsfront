import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Función para obtener el token de autenticación
const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Servicio para las cabañas
const cabinService = {
  // Obtener todas las cabañas (no requiere autenticación)
  getAllCabins: async () => {
    try {
      const response = await axios.get(`${API_URL}/cabins`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener cabañas:', error);
      throw error;
    }
  },

  // Obtener una cabaña por ID (no requiere autenticación)
  getCabinById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/cabins/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener cabaña con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva cabaña (requiere autenticación)
  createCabin: async (cabinData) => {
    try {
      const response = await axios.post(`${API_URL}/cabins`, cabinData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear cabaña:', error);
      throw error;
    }
  },

  // Actualizar una cabaña (requiere autenticación)
  updateCabin: async (id, cabinData) => {
    try {
      const response = await axios.put(`${API_URL}/cabins/${id}`, cabinData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar cabaña con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una cabaña (requiere autenticación)
  deleteCabin: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/cabins/${id}`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar cabaña con ID ${id}:`, error);
      throw error;
    }
  }
};

export default cabinService; 