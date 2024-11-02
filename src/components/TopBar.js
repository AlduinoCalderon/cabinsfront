// src/components/TopBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TopBarContainer = styled.div`
  width: 96.9%;
  height: 50px;
  background-color: #007BFF; // Azul
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
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
  top: 45px;
  right: 40px;
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

const GestionLinksContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-right: auto; 
`;

const GestionLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TopBar = ({ menuItems, gestionLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <TopBarContainer>
      {gestionLinks && (
        <GestionLinksContainer>
          {gestionLinks.map((link, index) => (
            <GestionLink key={index} to={link.path}>
              {link.label}
            </GestionLink>
          ))}
        </GestionLinksContainer>
      )}
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
