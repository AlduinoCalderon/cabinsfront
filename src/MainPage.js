// src/MainPage.js
import React from 'react';
import TopBar from './components/TopBar';

const MainPage = () => {
  return (
    <div>
      <TopBar menuItems={[{ label: 'Gestión', path: '/gestion' }]} />
    </div>
    
  );
};

export default MainPage;
