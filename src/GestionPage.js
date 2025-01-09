import React from 'react';
import NavBar  from './components/NavBar';
import { Container } from './styles/styles';
const user = localStorage.getItem('user');
const userinfo = JSON.parse(user);
const Dashboard = () => {
  return (
    <Container>
      <NavBar />
      <h1>Hola {userinfo.first_name}! <br></br> Bienvenido al Sistema de Gestión de Cabañas</h1>
    </Container>
  );
};

export default Dashboard;