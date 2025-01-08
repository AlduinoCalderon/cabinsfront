import React from 'react';
import NavBar  from './components/NavBar';
import { Container } from './styles/styles';

const Dashboard = () => {
  return (
    <Container>
      <NavBar />
      <h1>Bienvenido al Sistema de Gestión de Cabañas</h1>
      <p>Esta página está protegida y solo accesible si estás autenticado.</p>
    </Container>
  );
};

export default Dashboard;