import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.div`
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  height: 45px;
  flex-wrap: wrap; 
`;

const NavBarItem = styled(Link)`
  color: #f2f2f2;
  padding: 14px 16px;
  text-decoration: none;

  &:hover {
    background-color: #000;
  }
`;

const MenuIconContainer = styled.div`
  position: relative;
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
  position: absolute;
  top: 50px;
  right: 0;
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

const Saludo = styled.div`
  color: #f2f2f2;
  font-size: 16px;
  margin-right: 20px;
  margin-bottom: 10px; 
`;

const NavBar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const timerRef = React.useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setIsMenuOpen(false), 333);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    if (onLogout) onLogout();
    navigate('/');
  };

  const user = localStorage.getItem('user');
  const userinfo = JSON.parse(user);
  let userName = 'Invitado';

  if (user) {
    try {
      console.log(user, userinfo);
      console.log(userName, "ahora es", userinfo.first_name);
      userName = userinfo.first_name || 'Usuario';
    } catch (error) {
      console.warn('Token inválido:', error);
    }
  }

  return (
    <NavBarContainer>
        <div style={{ display: 'flex' }}>
          <NavBarItem to="/gestion/usuarios">Usuarios</NavBarItem>
          <NavBarItem to="/gestion/cabanas">Cabañas</NavBarItem>
          <NavBarItem to="/gestion/reservas">Reservas</NavBarItem>
        </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MenuIconContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <MenuIcon>
            <div></div>
            <div></div>
            <div></div>
          </MenuIcon>
          <DropdownMenu open={isMenuOpen}>
            <DropdownItem to="/gestion">Menú de Gestión</DropdownItem>
            <DropdownItem to="/" onClick={handleLogout}>
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </MenuIconContainer>
      </div>
    </NavBarContainer>
  );
};

export default NavBar;
