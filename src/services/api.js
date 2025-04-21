// ../src/services/api.js

import { API_URL, AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../constants';

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('La respuesta del servidor no es JSON válido');
  }
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error en la solicitud');
  }
  return data;
};

// Servicios de Autenticación
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const verifyToken = async () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) throw new Error('No hay token disponible');

  try {
    const response = await fetch(`${API_URL}/auth/verify-token`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error en verificación de token:', error);
    throw error;
  }
};

// Servicios de Usuarios
export const register = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const verifyEmail = async (token) => {
  const response = await fetch(`${API_URL}/auth/verify-email/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ is_active: 1 }),
  });
  return handleResponse(response);
};

export const resendVerificationEmail = async (email) => {
  const response = await fetch(`${API_URL}/auth/resend-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
};

export const requestPasswordReset = async (email) => {
  const response = await fetch(`${API_URL}/auth/request-password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
};

export const resetPassword = async (token, newPassword) => {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, newPassword }),
  });
  return handleResponse(response);
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return handleResponse(response);
};

export const fetchUser = (id) => {
  return fetch(`${API_URL}/users/${id}`)
    .then(handleResponse);
};

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return handleResponse(response);
};

// Servicios de Cabañas
export const fetchCabins = async () => {
  const response = await fetch(`${API_URL}/cabins`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return handleResponse(response);
};

export const fetchCabin = (id) => {
  return fetch(`${API_URL}/cabins/${id}`)
    .then(handleResponse);
};

export const createCabin = async (cabinData) => {
  const response = await fetch(`${API_URL}/cabins`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(cabinData),
  });
  return handleResponse(response);
};

export const updateCabin = async (cabinId, cabinData) => {
  const response = await fetch(`${API_URL}/cabins/${cabinId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(cabinData),
  });
  return handleResponse(response);
};

export const deleteCabin = async (cabinId) => {
  const response = await fetch(`${API_URL}/cabins/${cabinId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return handleResponse(response);
};

// Servicios de Reservas
export const fetchBookings = async () => {
  const response = await fetch(`${API_URL}/bookings`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return handleResponse(response);
};

export const fetchBooking = (id) => {
  return fetch(`${API_URL}/bookings/${id}`)
    .then(handleResponse);
};

export const fetchRecentBookings = () => {
  return fetch(`${API_URL}/bookings/new`)
    .then(handleResponse);
};

export const createBooking = async (bookingData) => {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(bookingData),
  });
  return handleResponse(response);
};

export const updateBooking = async (bookingId, bookingData) => {
  const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(bookingData),
  });
  return handleResponse(response);
};

export const deleteBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return handleResponse(response);
};

// Servicios de Pagos
export const fetchPayments = () => {
  return fetch(`${API_URL}/payments`)
    .then(handleResponse);
};

export const fetchPayment = (id) => {
  return fetch(`${API_URL}/payments/${id}`)
    .then(handleResponse);
};

export const createPayment = (paymentData) => {
  return fetch(`${API_URL}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData)
  }).then(handleResponse);
};

export const updatePayment = (paymentId, paymentData) => {
  return fetch(`${API_URL}/payments/${paymentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData)
  }).then(handleResponse);
};

export const deletePayment = (paymentId) => {
  return fetch(`${API_URL}/payments/${paymentId}`, {
    method: 'DELETE'
  }).then(handleResponse);
};

// Servicios de Imágenes
export const fetchImages = () => {
  return fetch(`${API_URL}/images`)
    .then(handleResponse);
};

export const fetchImage = (id) => {
  return fetch(`${API_URL}/images/${id}`)
    .then(handleResponse);
};

export const createImage = (imageData) => {
  return fetch(`${API_URL}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(imageData)
  }).then(handleResponse);
};

export const updateImage = (imageId, imageData) => {
  return fetch(`${API_URL}/images/${imageId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(imageData)
  }).then(handleResponse);
};

export const deleteImage = (imageId) => {
  return fetch(`${API_URL}/images/${imageId}`, {
    method: 'DELETE'
  }).then(handleResponse);
};
