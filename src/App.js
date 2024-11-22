
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import GestionPage from './GestionPage';
import GestionUsuarios from './GestionUsuarios';
import GestionCabanas from './GestionCabanas';
import GestionReservas from './GestionReservas';
import MapaInteractivo from './MapaInteractivo';

function App() {
  const [cabanas, setCabanas] = useState([
    { id: 1, nombre: "Cabaña Bella", estado: true },
    { id: 2, nombre: "Cabaña Hermosa", estado: false },
    { id: 3, nombre: "Cabaña Vista", estado: true },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/gestion" element={<GestionPage />} />
        <Route path="/gestion/usuarios" element={<GestionUsuarios />} />
        <Route path="/gestion/cabanas" element={<GestionCabanas />} />
        <Route path="/mapa" element={<MapaInteractivo />} />
        
        {/* Pasamos la lista de cabanas como prop a GestionReservas */}
        <Route path="/gestion/reservas" element={<GestionReservas cabanas={cabanas} />} />
      </Routes>
    </Router>
  );
}

export default App;
