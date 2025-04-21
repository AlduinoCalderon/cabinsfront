import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Función para obtener el token de autenticación
const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Servicio para el perfil de usuario
const userService = {
  // Obtener el perfil del usuario actual (requiere autenticación)
  getUserProfile: async () => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener perfil de usuario:', error);
      throw error;
    }
  },

  // Actualizar el perfil del usuario (requiere autenticación)
  updateUserProfile: async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/users/profile`, userData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar perfil de usuario:', error);
      throw error;
    }
  },

  // Cambiar la contraseña del usuario (requiere autenticación)
  changePassword: async (passwordData) => {
    try {
      const response = await axios.put(`${API_URL}/users/change-password`, passwordData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      throw error;
    }
  }
};

export default userService; 