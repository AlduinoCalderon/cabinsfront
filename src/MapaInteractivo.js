import React, { useState } from 'react';
import './MapaInteractivo.css'; // Archivo CSS para estilos
import CabanaTooltip from './CabanaTooltip';

const MapaInteractivo = () => {

    const [hoveredCabana, setHoveredCabana] = useState(null);

  const cabanas = [
    {
      id: 1,
      nombre: 'Cabaña El Bosque 8',
      descripcion: 'Una cabaña tranquila en medio del bosque.',
      precio: 120,
      imagenes: ['.../public/mapas.jpg', '.../public/mapas.jpg', '.../public/mapas.jpg'],
      position: { top: '25%', left: '40%' }
    },
    {
      id: 2,
      nombre: 'Cabaña La Montaña',
      descripcion: 'Perfecta para quienes aman la vista de la montaña.',
      precio: 150,
      imagenes: ['/public/mapas.jpg', '/public/mapas.jpg', '/public/mapas.jpg'],
      position: { top: '45%', left: '20%' }
    },
    {
        id: 3,
        nombre: 'Cabaña gran lago',
        descripcion: 'Perfecta para quienes aman la vista de la montaña.',
        precio: 150,
        imagenes: ['/public/mapas.jpg', '/public/mapas.jpg', '/public/mapas.jpg'],
        position: { top: '40%', left: '70%'  }
    },
    {
        id: 4,
        nombre: 'Cabaña Gran azul',
        descripcion: 'Perfecta para quienes aman la vista de la montaña.',
        precio: 180,
        imagenes: ['/public/mapas.jpg', '/public/mapas.jpg', '/public/mapas.jpg'],
        position: { top: '20%', left: '10%'  }
    },
    {
        id: 5,
        nombre: 'Cabaña El Bosque 5',
        descripcion: 'Una cabaña tranquila en medio del bosque.',
        precio: 190,
        imagenes: ['/public/mapas.jpg', '/public/mapas.jpg', '/public/mapas.jpg'],
        position: { top: '20%', left: '75%' }
    },
    {
        id: 6,
        nombre: 'Cabaña El Bosque 4',
        descripcion: 'Una cabaña tranquila en medio del bosque.',
        precio: 140,
        imagenes: ['/public/mapas.jpg', '/public/mapas.jpg', '/public/mapas.jpg'],
        position: { top: '65%', left: '50%' }
      },


  ];
  return (
    <div className="mapa-interactivo">
    <img src="/mapa.jpg" alt="Mapa de las cabañas" className="fondo-mapa" />

    {cabanas.map((cabana) => (
      <div
        key={cabana.id}
        className="cabana-boton"
        style={{ top: cabana.position.top, left: cabana.position.left }}
        onMouseEnter={() => setHoveredCabana(cabana)}
        onMouseLeave={() => setHoveredCabana(null)}
      >
        🏡
        {hoveredCabana && hoveredCabana.id === cabana.id && (
          <div className="tooltip-container">
            <CabanaTooltip
              nombre={cabana.nombre}
              descripcion={cabana.descripcion}
              precio={cabana.precio}
              imagenes={cabana.imagenes}
            />
          </div>
        )}
      </div>
    ))}
  </div>
  );
};

export default MapaInteractivo;
