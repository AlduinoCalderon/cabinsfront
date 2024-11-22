import React from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

const StatusCell = styled.td`
  background-color: ${props => {
    switch (props.status) {
      case 'confirmed':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'canceled':
        return 'red';
      default:
        return 'white';
    }
  }};
  color: black;
`;

const ReservationTable = ({
  filteredReservas,
  handleEditReserva,
  handleDeleteReserva,
  cabanas,
  usuarios
}) => (
  <Table>
    <thead>
      <tr>
        <th>ID de Reserva</th>
        <th>Usuario</th>
        <th>Cabaña</th>
        <th>Fecha de Llegada</th>
        <th>Fecha de Partida</th>
        <th>Estado</th>
        <th>Notas</th>
        <th>Descuento</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {filteredReservas.map(reserva => (
        <tr key={reserva.booking_id} title={`Costo: $${(cabanas.find(cabin => cabin.cabin_id === reserva.cabin_id)?.cost_per_night)*(reserva.nights)*(1-reserva.discount/100) || 'Cabaña no encontrada'}, Noches: ${reserva.nights}`}>
          <td>{reserva.booking_id}</td>
          <td>{`${usuarios.find(user => user.user_id === reserva.user_id)?.first_name}
          (${usuarios.find(user => user.user_id === reserva.user_id)?.email})` || 'Usuario no encontrado'}</td>
          <td>{cabanas.find(cabin => cabin.cabin_id === reserva.cabin_id)?.name || 'Cabaña no encontrada'}</td>
          <td>{moment(reserva.start_date).format('DD-MM-YYYY')}</td>
          <td>{moment(reserva.start_date).add(reserva.nights, 'days').format('DD-MM-YYYY')}</td>
          <StatusCell status={reserva.status}>{reserva.status}</StatusCell>
          <td>{reserva.note}</td>
          <td>{reserva.discount ? `${reserva.discount}%` : 'N/A'}</td>
          <td>
            <button onClick={() => handleEditReserva(reserva)}>Editar</button>
            <button onClick={() => handleDeleteReserva(reserva.booking_id)}>Cancelar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ReservationTable;
