import React from 'react';
import styled from 'styled-components';
import { BlueButton, RedButton } from '../styles/styles';

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

  max-width: 100%;

  /* Ajustar el tamaño de la fuente para pantallas pequeñas */
  @media (max-width: 768px) {
    th, td {
      font-size: 0.8em; /* Disminuye el tamaño de las letras */
      padding: 6px; /* Ajusta el espaciado */
    }
  }
`;


const CabinTable = ({ cabins, handleEditCabin, handleDeleteCabin }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th style={{ fontSize: '0.8em'}}>Capacidad</th>
          <th style={{ fontSize: '0.8em'}}>Descripción</th>
          <th>Costo por Noche</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {cabins.map(cabin => (
          <tr key={cabin.cabin_id}>
            <td>{cabin.cabin_id}</td>
            <td>{cabin.name}</td>
            <td>{cabin.capacity}</td>
            <td style={{ fontSize: '0.8em'}}>{cabin.description}</td>
            <td>${cabin.cost_per_night}</td>
            <td>
              <BlueButton onClick={() => handleEditCabin(cabin)}>Editar</BlueButton>
              <RedButton delete onClick={() => handleDeleteCabin(cabin.cabin_id)}>Eliminar</RedButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CabinTable;
