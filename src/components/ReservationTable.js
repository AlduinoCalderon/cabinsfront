import React, { useState } from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { RedButton, BlueButton } from '../styles/styles';

const TableContainer = styled.div`
  position: relative;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  tr:hover {
    background-color: rgb(135, 176, 230);
    cursor: pointer;
    position: relative;
  }

  @media (max-width: 768px) {
    th, td {
      font-size: 12px;
      padding: 4px;
    }
  }

  .state-confirmed {
    background-color: #d4edda;
  }

  .state-pending {
    background-color: #fff3cd;
  }

  .state-canceled {
    background-color: #e2e3e5;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  font-size: 12px;
  z-index: 10;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  top: -10px;
  left: 100%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const ReservationTable = ({
  filteredReservas,
  handleEditReserva,
  handleDeleteReserva,
  cabanas,
  usuarios
}) => {
  const [tooltip, setTooltip] = useState({ visible: false, content: '', targetRow: null });

  const handleMouseEnter = (reserva, rowRef) => {
    const cabana = cabanas.find(cabin => cabin.cabin_id === reserva.cabin_id);
    const totalCost = cabana
      ? (cabana.cost_per_night * reserva.nights * (1 - (reserva.discount || 0) / 100)).toFixed(2)
      : 'N/A';

    const content = `
      <strong>Costo Total:</strong> $${totalCost}<br />
      <strong>Noches:</strong> ${reserva.nights}<br />
      <strong>Descuento:</strong> ${reserva.discount || '0'}%<br />
      <strong>Estado:</strong> ${reserva.status}<br />
      <strong>Notas:</strong> ${reserva.note || 'Sin notas'}
    `;

    setTooltip({
      visible: true,
      content,
      targetRow: rowRef
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, content: '', targetRow: null });
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Cabaña</th>
            <th>Fecha de Llegada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservas.map(reserva => {
            const usuario = usuarios.find(user => user.user_id === reserva.user_id);
            const cabana = cabanas.find(cabin => cabin.cabin_id === reserva.cabin_id);

            return (
              <tr
                key={reserva.booking_id}
                className={`state-${reserva.status}`}
                onMouseEnter={(e) => handleMouseEnter(reserva, e.currentTarget)}
                onMouseLeave={handleMouseLeave}
              >
                <td>{reserva.booking_id}</td>
                <td>{usuario ? `${usuario.first_name} (${usuario.email})` : 'Usuario no encontrado'}</td>
                <td>{cabana ? cabana.name : 'Cabaña no encontrada'}</td>
                <td>{moment(reserva.start_date).format('DD-MM-YYYY')}</td>
                <td>
                  <BlueButton onClick={() => handleEditReserva(reserva)}>Editar</BlueButton>
                  <RedButton onClick={() => handleDeleteReserva(reserva.booking_id)}>Cancelar</RedButton>
                </td>
              

              </tr>
            );
          })}
            {tooltip.targetRow && (
              <Tooltip
                visible={tooltip.visible}
                dangerouslySetInnerHTML={{ __html: tooltip.content }}
                style={{
                  position: 'absolute',
                  top: tooltip.targetRow.offsetTop - tooltip.targetRow.offsetHeight,
                  left: tooltip.targetRow.offsetLeft + tooltip.targetRow.offsetWidth / 2,
                }}
              />
            )}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ReservationTable;
