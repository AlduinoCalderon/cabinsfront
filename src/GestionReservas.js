import React, { useState } from 'react';
import TopBar from './components/TopBar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const GestionReservas = ({cabanas}) => {
  const [reservas, setReservas] = useState([]);
  const [newReserva, setNewReserva] = useState({
    nombre: '',
    estado: 'pendiente',
    cabanaId: '',
    fechaInicio: new Date(),
    fechaFin: new Date(),
    descuento: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReserva((prevReserva) => ({ ...prevReserva, [name]: value }));
  };

  const handleDateChange = (date, field) => {
    setNewReserva((prevReserva) => ({ ...prevReserva, [field]: date }));
  };

  const isFormValid = () => {
    return (
      newReserva.nombre && 
      newReserva.cabanaId &&
      newReserva.fechaInicio &&
      newReserva.fechaFin
    );
  };

  const handleAddReserva = () => {
    if (!isFormValid()) return alert("Por favor, completa todos los campos obligatorios.");
    setReservas([...reservas, { ...newReserva, id: Date.now() }]);
    setNewReserva({ nombre: '', estado: 'pendiente', cabanaId: '', fechaInicio: new Date(), fechaFin: new Date(), descuento: '' });
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
      <h1>Gestión de Reservas</h1>
      <div style={{ marginBottom: '20px' }}>
        <input type="text" name="nombre" placeholder="Nombre del Reservador" value={newReserva.nombre} onChange={handleInputChange} />

        <select name="estado" value={newReserva.estado} onChange={handleInputChange}>
          <option value="pendiente">Pendiente</option>
          <option value="pagada">Pagada</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <select name="cabanaId" value={newReserva.cabanaId} onChange={handleInputChange}>
          <option value="">Selecciona una cabaña</option>
          {cabanas.filter(c => c.estado).map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <label>Fecha de Inicio: </label>
        <DatePicker selected={newReserva.fechaInicio} onChange={(date) => handleDateChange(date, 'fechaInicio')} />
        
        <label>Fecha de Fin: </label>
        <DatePicker selected={newReserva.fechaFin} onChange={(date) => handleDateChange(date, 'fechaFin')} />

        <input type="number" name="descuento" placeholder="Descuento (%)" value={newReserva.descuento} onChange={handleInputChange} />

        <button onClick={handleAddReserva} disabled={!isFormValid()}>Guardar Nueva Reserva</button>
      </div>

      <h3>Lista de Reservas</h3>
      <ul>
        {reservas.map(reserva => (
          <li key={reserva.id}>
            <strong>{reserva.nombre}</strong> - Estado: {reserva.estado} - Cabaña ID: {reserva.cabanaId}
            <p>Desde: {reserva.fechaInicio.toLocaleDateString()} Hasta: {reserva.fechaFin.toLocaleDateString()}</p>
            <p>Descuento: {reserva.descuento || 'No aplica'}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionReservas;
