// src/ReservaForm.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';

const ReservaForm = ({ cabanas, usuarios, onAddReserva, selectedReserva, onEditReserva }) => {
  const [newReserva, setNewReserva] = useState({
    user_id: '',
    cabin_id: '',
    start_date: new Date(),
    end_date: addDays(new Date(), 1),
    status: 'pending',
    discount: '',
    note: ''
  });

  useEffect(() => {
    if (selectedReserva) {
      setNewReserva(selectedReserva);
    } else {
      setNewReserva({
        user_id: '',
        cabin_id: '',
        start_date: new Date(),
        end_date: addDays(new Date(), 1),
        status: 'pending',
        discount: '',
        note: ''
      });
    }
  }, [selectedReserva]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReserva({ ...newReserva, [name]: value });
  };

  const handleStartDateChange = (date) => {
    setNewReserva((prevReserva) => ({
      ...prevReserva,
      start_date: date,
      end_date: addDays(date, 1) // La fecha de fin por defecto es un día después
    }));
  };

  const handleEndDateChange = (date) => {
    setNewReserva((prevReserva) => ({
      ...prevReserva,
      end_date: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedReserva) {
      onEditReserva(newReserva); // Actualiza la reserva existente
    } else {
      onAddReserva(newReserva); // Agrega una nueva reserva
    }
    setNewReserva({ // Reinicia el formulario
      user_id: '',
      cabin_id: '',
      start_date: new Date(),
      end_date: addDays(new Date(), 1),
      status: 'pending',
      discount: '',
      note: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Selecciona un usuario:</label>
        <select name="user_id" value={newReserva.user_id} onChange={handleInputChange}>
          <option value="">Selecciona un usuario</option>
          {usuarios.map(user => (
            <option key={user.user_id} value={user.user_id}>{`${user.first_name} (${user.email})`}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Selecciona una cabaña:</label>
        <select name="cabin_id" value={newReserva.cabin_id} onChange={handleInputChange}>
          <option value="">Selecciona una cabaña</option>
          {cabanas.map(cabin => (
            <option key={cabin.cabin_id} value={cabin.cabin_id}>{cabin.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Fecha de inicio:</label>
        <DatePicker
          selected={newReserva.start_date}
          onChange={handleStartDateChange}
          selectsStart
          startDate={newReserva.start_date}
          endDate={newReserva.end_date}
          minDate={new Date()}
        />
      </div>
      <div>
        <label>Fecha de fin:</label>
        <DatePicker
          selected={newReserva.end_date}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={newReserva.start_date}
          endDate={newReserva.end_date}
          minDate={newReserva.start_date}
        />
      </div>
      <div>
        <label>Estado:</label>
        <select name="status" value={newReserva.status} onChange={handleInputChange}>
          <option value="pending">Pendiente</option>
          <option value="confirmed">Confirmada</option>
          <option value="canceled">Cancelada</option>
        </select>
      </div>
      <div>
        <label>Descuento (%):</label>
        <input
          type="number"
          name="discount"
          value={newReserva.discount}
          onChange={handleInputChange}
          min="0"
          max="100"
        />
      </div>
      <div>
        <label>Nota:</label>
        <textarea
          name="note"
          value={newReserva.note}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">{selectedReserva ? 'Actualizar Reserva' : 'Agregar Reserva'}</button>
    </form>
  );
};

export default ReservaForm;
