// src/components/NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Usamos useNavigate en lugar de useHistory
import styled from 'styled-components';

const NavBarContainer = styled.div`
  background-color: #333;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;
`;

const NavBarItem = styled(Link)`
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

const MenuIcon = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 25px;
  height: 20px;
  
  div {
    width: 100%;
    height: 3px;
    background-color: white;
  }
`;

const DropdownMenu = styled.div`
  position: sticky;
  top: 50px;
  right: 0px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 150px;
  padding: 10px 0;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const NavBar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();  // Usamos useNavigate para la redirección

  const handleLogout = () => {
   
    localStorage.removeItem('authToken');
    
  };
  

  return (
    <NavBarContainer>
      {/* Enlaces de gestión */}
      <div>
        <NavBarItem to="/gestion/usuarios">Usuarios</NavBarItem>
        <NavBarItem to="/gestion/cabanas">Cabañas</NavBarItem>
        <NavBarItem to="/gestion/reservas">Reservas</NavBarItem>
      </div>

      {/* Menú desplegable */}
      <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </MenuIcon>
      
      <DropdownMenu open={isMenuOpen}>
        <DropdownItem to="/gestion">Menú de Gestión</DropdownItem>
        <DropdownItem to="/" onClick={handleLogout}>Cerrar sesión</DropdownItem>
      </DropdownMenu>
    </NavBarContainer>
  );
};

export default NavBar;
