// src/components/TopBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TopBarContainer = styled.div`
  width: 100%;
  height: 30px; // Ajusta esta altura como prefieras
  background-color: #007BFF; // Azul
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
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
  top: 30px;
  right: 20px;
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

const TopBar = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <TopBarContainer>
      <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </MenuIcon>
      <DropdownMenu open={isMenuOpen}>
        {menuItems.map((item, index) => (
          <DropdownItem key={index} to={item.path}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </TopBarContainer>
  );
};

export default TopBar;
