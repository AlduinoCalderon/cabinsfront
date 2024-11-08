import React, { useEffect, useRef, useState } from 'react';
import './CabanaTooltip.css';

const CabanaTooltip = ({ nombre, descripcion, precio, imagenes, position = { x: 0, y: 0 } }) => {
  const tooltipRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState(position);

  useEffect(() => {
    const tooltipElement = tooltipRef.current;
    if (tooltipElement && position) {
      const { innerWidth, innerHeight } = window;
      const tooltipRect = tooltipElement.getBoundingClientRect();

      // Ajusta la posición del tooltip si se sale de los bordes de la ventana
      let adjustedX = position.x ?? 0;
      let adjustedY = position.y ?? 0;

      if (tooltipRect.right > innerWidth) {
        adjustedX = innerWidth - tooltipRect.width - 10; // Ajusta el borde derecho
      }
      if (tooltipRect.bottom > innerHeight) {
        adjustedY = innerHeight - tooltipRect.height - 10; // Ajusta el borde inferior
      }

      setTooltipPosition({ x: adjustedX, y: adjustedY });
    }
  }, [position]);

  return (
    <div
      className="cabana-tooltip"
      style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
      ref={tooltipRef}
    >
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p>Precio por noche: ${precio}</p>
      <div className="cabana-imagenes">
        {imagenes.map((img, index) => (
          <img key={index} src={img} alt={`Imagen ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default CabanaTooltip;
