import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import moment from 'moment-timezone';
import { GridContainer, DatePickerWrapper, ControlsWrapper, Input, Select } from '../styles/styles';

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px; /* Ajusta el tamaño de la fuente en pantallas pequeñas */
  }
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 1.1rem; /* Uso de rem para mantener la relación proporcional */
  
  @media (max-width: 768px) {
    font-size: 1rem; /* Ajuste para pantallas pequeñas */
  }
`;



export const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem; /* Ajuste relativo de fuente */
  
  @media (max-width: 768px) {
    font-size: 0.9rem; /* Ajuste para pantallas pequeñas */
  }
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Ajuste para pantallas pequeñas */
  }
`;

export const Legend = styled.p`
  margin-top: 10px;
  font-weight: bold;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Ajuste para pantallas pequeñas */
  }
`;

export const CostLabel = styled.div`
  margin-top: 20px;
  font-weight: bold;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Ajuste para pantallas pequeñas */
  }
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

    <GridContainer>
      <DatePickerWrapper> 
      <p><strong>Selecciona la fecha de llegada:</strong></p>
        <DatePicker
          selected={newReserva.start_date}
          onChange={handleDateChange}
          minDate={new Date()}
          excludeDates={excludedDates}
          disabled={!newReserva.cabin_id}
          inline
        />
      </DatePickerWrapper>

      <ControlsWrapper>
        <div>
          <p><strong>Número de noches:</strong></p>
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
        </div>

        <div>
          <p><strong>Descuento:</strong></p>
          <Input
            type="number"
            name="discount"
            value={newReserva.discount}
            onChange={handleInputChange}
            min="0"
            max="100"
          />
        </div>
      </ControlsWrapper>
    </GridContainer>

    <Label>Estado:</Label>
    <Select name="status" value={newReserva.status} onChange={handleInputChange}>
      <option value="pending">Pendiente</option>
      <option value="confirmed">Confirmada</option>
    </Select>

    <Label>Notas:</Label>
    <TextArea name="note" value={newReserva.note} onChange={handleInputChange} />

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
