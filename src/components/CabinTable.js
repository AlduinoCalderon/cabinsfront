import React from 'react';
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

const Button = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  background-color: ${props => props.delete ? 'red' : '#007BFF'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CabinTable = ({ cabins, handleEditCabin, handleDeleteCabin }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Capacidad</th>
          <th>Descripción</th>
          <th>Ubicación</th>
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
            <td>{cabin.description}</td>
            <td>{cabin.location}</td>
            <td>{cabin.cost_per_night}</td>
            <td>
              <Button onClick={() => handleEditCabin(cabin)}>Editar</Button>
              <Button delete onClick={() => handleDeleteCabin(cabin.cabin_id)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CabinTable;
