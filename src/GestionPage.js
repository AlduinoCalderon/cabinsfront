// src/GestionPage.js
import React from 'react';
import TopBar from './components/TopBar';

const GestionPage = () => {
  return (
    <div>
      <TopBar 
        menuItems={[
          { label: 'Inicio', path: '/' },
          { label: 'Gestión de Usuarios', path: '/gestion/usuarios' }, 
          { label: 'Gestión de Cabañas', path: '/gestion/cabanas' }, 
          { label: 'Gestión de Reservas', path: '/gestion/reservas' }
        ]}
      />
      <h1>Bienvenido a la Gestión</h1>
      <p>Aquí podrás gestionar usuarios, cabañas y reservas.</p>
    </div>
  );
};

export default GestionPage;
