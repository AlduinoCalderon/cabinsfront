import React from 'react';
import NavBar  from './components/NavBar';

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <h1>Bienvenido al Sistema de Gestión de Cabañas</h1>
      <p>Esta página está protegida y solo accesible si estás autenticado.</p>
    </div>
  );
};

export default Dashboard;