// src/GestionCabanas.js prueba push
import React, { useState } from 'react';
import TopBar from './components/TopBar';

const GestionCabanas = () => {
  const [cabanas, setCabanas] = useState([]);
  const [newCabana, setNewCabana] = useState({
    nombre: '',
    costoPorNoche: '',
    capacidad: '',
    descripcion: '',
    estado: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCabana((prevCabana) => ({
      ...prevCabana,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddCabana = () => {
    setCabanas([...cabanas, { ...newCabana, id: Date.now(), deleted: false }]);
    setNewCabana({ nombre: '', costoPorNoche: '', capacidad: '', descripcion: '', estado: false });
  };

  const handleDeleteCabana = (id) => {
    setCabanas(cabanas.map(cabana => cabana.id === id ? { ...cabana, deleted: true } : cabana));
  };

  const handleUpdateCabana = (id) => {
    const updatedCabana = cabanas.find(cabana => cabana.id === id);
    if (updatedCabana) {
      setNewCabana(updatedCabana);
    }
  };

  const handleSaveUpdate = () => {
    setCabanas(cabanas.map(cabana => cabana.id === newCabana.id ? newCabana : cabana));
    setNewCabana({ nombre: '', costoPorNoche: '', capacidad: '', descripcion: '', estado: false });
  };
  return (
    <div>
      <TopBar 
        menuItems={[{ label: 'Inicio', path: '/' }]}
        gestionLinks={[
          { label: 'Gestión de Usuarios', path: '/gestion/usuarios' },
          { label: 'Gestión de Cabañas', path: '/gestion/cabanas' },
          { label: 'Gestión de Reservas', path: '/gestion/reservas' }
        ]}
      />
      <h1>Gestión de Cabañas</h1>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre de la cabaña" 
          value={newCabana.nombre} 
          onChange={handleInputChange} 
        />
        <input 
          type="number" 
          name="costoPorNoche" 
          placeholder="Costo por noche" 
          value={newCabana.costoPorNoche} 
          onChange={handleInputChange} 
        />
        <input 
          type="number" 
          name="capacidad" 
          placeholder="Capacidad" 
          value={newCabana.capacidad} 
          onChange={handleInputChange} 
        />
        <input 
          type="text" 
          name="descripcion" 
          placeholder="Descripción" 
          value={newCabana.descripcion} 
          onChange={handleInputChange} 
        />
        <label>
          Activa: 
          <input 
            type="checkbox" 
            name="estado" 
            checked={newCabana.estado} 
            onChange={handleInputChange} 
          />
        </label>
        
        {newCabana.id ? (
          <button onClick={handleSaveUpdate}>Guardar Cambios</button>
        ) : (
          <button onClick={handleAddCabana}>Guardar Nueva Cabaña</button>
        )}
      </div>

      <h3>Lista de Cabañas</h3>
      <ul>
        {cabanas.filter(cabana => !cabana.deleted).map(cabana => (
          <li key={cabana.id}>
            <strong>{cabana.nombre}</strong> - ${cabana.costoPorNoche}/noche - Capacidad: {cabana.capacidad} personas
            <p>{cabana.descripcion}</p>
            <p>Estado: {cabana.estado ? "Activa" : "Inactiva"}</p>
            <button onClick={() => handleUpdateCabana(cabana.id)}>Consultar/Actualizar</button>
            <button onClick={() => handleDeleteCabana(cabana.id)}>Borrar Lógico</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionCabanas;
