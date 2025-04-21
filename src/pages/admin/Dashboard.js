import React from 'react';
import styled from 'styled-components';
import NavBar from '../../components/layout/NavBar';
import { Container } from '../../styles/styles';

const WelcomeTitle = styled.h1`
  color: #333;
  text-align: center;
  margin: 20px 0;
  font-size: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Dashboard = () => {
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Decodificar el token JWT
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);
        setUserName(payload.first_name || 'Usuario');
      }
    } catch (error) {
      console.error('Error al procesar el token:', error);
      setUserName('Usuario');
    }
  }, []);

  return (
    <Container>
      <NavBar />
      <WelcomeTitle>
        Hola {userName}! <br /> 
        Bienvenido al Sistema de Gestión de Cabañas
      </WelcomeTitle>
    </Container>
  );
};

export default Dashboard;