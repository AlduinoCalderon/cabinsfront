// src/api.js
const BASE_URL = 'http://localhost:8001';

export const fetchReservas = async () => {
  const response = await fetch(`${BASE_URL}/bookings`);
  if (!response.ok) {
    throw new Error('Error al cargar reservas');
  }
  return response.json();
};

export const fetchCabanas = async () => {
  const response = await fetch(`${BASE_URL}/cabins`);
  if (!response.ok) {
    throw new Error('Error al cargar cabañas');
  }
  return response.json();
};

export const fetchUsuarios = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Error al cargar usuarios');
  }
  return response.json();
};

export const addReserva = async (reserva) => {
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reserva),
  });
  if (!response.ok) {
    throw new Error('Error al agregar reserva');
  }
  return response.json();
};

export const updateReserva = async (id, reserva) => {
  const response = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reserva),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar reserva');
  }
  return response.json();
};

export const deleteReserva = async (id) => {
  const response = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar reserva');
  }
};
