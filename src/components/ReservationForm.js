import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import moment from 'moment-timezone';
// components/ReservationForm.js

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Legend = styled.p`
  margin-top: 10px;
  font-weight: bold;
`;

export const CostLabel = styled.div`
  margin-top: 20px;
  font-weight: bold;
`;

export const ReservationForm = ({
  newReserva,
  handleInputChange,
  handleDateChange,
  handleNightsChange,
  isFormValid,
  calculateCost,
  handleAddOrUpdateReserva,
  nights,
  usuarios,
  cabanas,
  excludedDates,
  getAvailableNights,
  isEditing
}) => (
  <FormSection>
    <Label>Selecciona un usuario:</Label>
    <Select name="user_id" value={newReserva.user_id} onChange={handleInputChange}>
      <option value="">Selecciona un usuario</option>
      {usuarios.map(user => (
        <option key={user.user_id} value={user.user_id}>{`${user.first_name} (${user.email})`}</option>
      ))}
    </Select>

    <Label>Selecciona una cabaña:</Label>
    <Select name="cabin_id" value={newReserva.cabin_id} onChange={handleInputChange}>
      <option value="">Selecciona una cabaña</option>
      {cabanas.map(cabin => (
        <option key={cabin.cabin_id} value={cabin.cabin_id}>{cabin.name}</option>
      ))}
    </Select>

    <Label>Selecciona la fecha de llegada:</Label>
    <DatePicker
      selected={newReserva.start_date}
      onChange={handleDateChange}
      minDate={new Date()}
      excludeDates={excludedDates}
      disabled={!newReserva.cabin_id}
      inline
    />

    <Label>Número de noches:</Label>
    <Select
      value={nights}
      onChange={handleNightsChange}
      disabled={!newReserva.cabin_id || !newReserva.start_date}
    >
      <option value="" disabled>Selecciona cantidad de noches</option>
      {getAvailableNights().map(night => (
        <option key={night} value={night}>{night}</option>
      ))}
    </Select>

    {newReserva.start_date && nights > 0 && (
      <Legend>
        Reserva de {nights + 1} días y {nights} noches.
        Fecha de salida: {newReserva.start_date && nights 
        ? moment(newReserva.start_date).add(nights, 'days').format('DD-MM-YYYY') 
        : 'No asignada'}
      </Legend>
    )}

    <Label>Estado:</Label>
    <Select name="status" value={newReserva.status} onChange={handleInputChange}>
      <option value="pending">Pendiente</option>
      <option value="confirmed">Confirmada</option>
    </Select>

    <Label>Notas:</Label>
    <TextArea name="note" value={newReserva.note} onChange={handleInputChange} />

    <Label>Descuento:</Label>
    <input
      type="number"
      name="discount"
      value={newReserva.discount}
      onChange={handleInputChange}
      min="0"
      max="100"
    />

    {isFormValid() && (
      <CostLabel>
        Costo de la reserva: ${calculateCost()}
      </CostLabel>
    )}

    <Button onClick={handleAddOrUpdateReserva} disabled={!isFormValid() && !isEditing}>
      {isEditing ? 'Actualizar Reserva' : 'Agregar Reserva'}
    </Button>
  </FormSection>
);


