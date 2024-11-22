// src/MainPage.js
import React from 'react';
import TopBar from './components/TopBar';

const MainPage = () => {
  return (
    <div>
      <TopBar menuItems={[{ label: 'Gestión', path: '/gestion' },
        { label: 'Mapa', path: '/mapa' }
      ]} />
    </div>
    
  );
};

export default MainPage;
