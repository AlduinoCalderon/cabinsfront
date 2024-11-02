// src/GestionPage.js
import React from 'react';
import TopBar from './components/TopBar';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 65vh;
  text-align: center;
  font-family: 'Arial', sans-serif; // Cambia la fuente aquí
  color: #333; // Cambia el color del texto aquí
`;

const Title = styled.h1`
  color: hsl(29, 49%, 47%); // Cambia el color del título aquí
  font-size: 4.5rem;
`;

const Description = styled.p`
  color: #000000; // Cambia el color de la descripción aquí
  font-size: 2.5rem;
`;

const GestionPage = () => {
  return (
    <div>
      <TopBar 
        menuItems={[{ label: 'Inicio', path: '/' }]} // Menú desplegable con opción para regresar a la página principal
        gestionLinks={[
          { label: 'Gestión de Usuarios', path: '/gestion/usuarios' },
          { label: 'Gestión de Cabañas', path: '/gestion/cabanas' },
          { label: 'Gestión de Reservas', path: '/gestion/reservas' }
        ]}
      />
      <Container>
      <Title>Control y Gestión </Title>
      <Description>Apartado diseñado para el control de:</Description>
      <Description>Los usuarios, las cabañas y las reservas.</Description>
      </Container>
    </div>
  );
};

export default GestionPage;
