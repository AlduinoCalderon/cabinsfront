import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TopBarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #007BFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;
`;

const MenuIconContainer = styled.div`
  margin-left: auto;
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

const GestionLinksContainer = styled.div`
  display: flex;
  gap: 20px;
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
  const timerRef = React.useRef(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setIsMenuOpen(false), 333);
  };

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
          {menuItems.map((item, index) => (
            <DropdownItem key={index} to={item.path}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </MenuIconContainer>
    </TopBarContainer>
  );
};

export default TopBar;
 