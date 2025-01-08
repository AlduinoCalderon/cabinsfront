// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom'; // Cambiado de Redirect a Navigate

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Verifica si hay un token de autenticación

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirige a login si no está autenticado
  }

  return children; // Muestra el contenido protegido si está autenticado
};

export default ProtectedRoute;
