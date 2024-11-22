import React from 'react';
import styled from 'styled-components';

const NavBarContainer = styled.div`
  background-color: #333;
  overflow: hidden;
`;

const NavBarItem = styled.a`
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;

  &:hover {
    background-color: #ddd;
    color: black;
  }
`;

const NavBar = () => (
  <NavBarContainer>
    <NavBarItem href="/">Inicio</NavBarItem>
    <NavBarItem href="/gestion/usuarios">Gestión de Usuarios</NavBarItem>
    <NavBarItem href="/gestion/cabanas">Gestión de Cabañas</NavBarItem>
    <NavBarItem href="/gestion/reservas">Gestión de Reservas</NavBarItem>
  </NavBarContainer>
);

export default NavBar;
