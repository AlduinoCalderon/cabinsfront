// src/GestionReservas.js
import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  @media (min-width: 768px) {
    max-width: 800px;
    margin: auto;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
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
        return 'white'; // O el color que prefieras para el estado por defecto
    }
  }};
  color: black; // Mantener el texto siempre negro
`;


const GestionReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cabanas, setCabanas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newReserva, setNewReserva] = useState({
    user_id: '',
    cabin_id: '',
    start_date: new Date(),
    end_date: addDays(new Date(), 1),
    status: 'pending',
    discount: '',
    note: ''
  });
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001/bookings')
      .then(response => response.json())
      .then(data => setReservas(data));

    fetch('http://localhost:8001/cabins')
      .then(response => response.json())
      .then(data => setCabanas(data));

    fetch('http://localhost:8001/users')
      .then(response => response.json())
      .then(data => setUsuarios(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'discount') {
      if (value < 0 || value > 100) return; // Validación de descuento
    }
    setNewReserva((prevReserva) => ({ ...prevReserva, [name]: value }));
  };

  const handleDateChange = (date) => {
    setNewReserva((prevReserva) => ({ ...prevReserva, start_date: date, end_date: date }));
  };

  const isFormValid = () => {
    return (
      newReserva.user_id && 
      newReserva.cabin_id &&
      newReserva.start_date
    );
  };

  const handleAddReserva = () => {
    if (!isFormValid()) return alert("Por favor, completa todos los campos obligatorios.");
    fetch('http://localhost:8001/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReserva)
    })
    .then(response => response.json())
    .then(data => {
      setReservas([...reservas, data.Booking]);
      setNewReserva({ user_id: '', cabin_id: '', start_date: new Date(), end_date: addDays(new Date(), 1), status: 'pending', discount: '', note: '' });
    });
  };

  const handleDeleteReserva = (id) => {
    fetch(`http://localhost:8001/bookings/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setReservas(reservas.map(reserva => reserva.booking_id === id ? { ...reserva, is_active: false } : reserva));
    });
  };

  const handleUpdateReserva = (id) => {
    const updatedReserva = reservas.find(reserva => reserva.booking_id === id);
    if (updatedReserva) {
      setNewReserva(updatedReserva);
    }
  };

  const handleSaveUpdate = () => {
    fetch(`http://localhost:8001/bookings/${newReserva.booking_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReserva)
    })
    .then(response => response.json())
    .then(data => {
      setReservas(reservas.map(reserva => reserva.booking_id === newReserva.booking_id ? newReserva : reserva));
      setNewReserva({ user_id: '', cabin_id: '', start_date: new Date(), end_date: addDays(new Date(), 1), status: 'pending', discount: '', note: '' });
    });
  };

  const handleFilterChange = (e) => {
    setFilterField(e.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const filteredReservas = reservas.filter(reserva => {
    if (!reserva.is_active) return false;
    const selectedDate = new Date(filterValue);
    const isDateMatching = selectedDate >= new Date(reserva.start_date) && selectedDate <= new Date(reserva.end_date);
    
    if (filterField === 'user') {
      return reserva.user_id === parseInt(filterValue);
    } else if (filterField === 'cabin') {
      return reserva.cabin_id === parseInt(filterValue);
    } else if (filterField === 'date') {
      return isDateMatching;
    }
    return true;
  });

  return (
    <Container>
      <TopBar 
        menuItems={[{ label: 'Inicio', path: '/' }]}
        gestionLinks={[
          { label: 'Gestión de Usuarios', path: '/gestion/usuarios' },
          { label: 'Gestión de Cabañas', path: '/gestion/cabanas' },
          { label: 'Gestión de Reservas', path: '/gestion/reservas' }
        ]}
      />
      <h1>Gestión de Reservas</h1>

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
      </FormSection>

      <FormSection>
        <Label>Fecha:</Label>
        <DatePicker
          selected={newReserva.start_date}
          onChange={handleDateChange}
          inline
        />
      </FormSection>

      <FormSection>
        <Label>Estado:</Label>
        <Select name="status" value={newReserva.status} onChange={handleInputChange}>
          <option value="pending">Pendiente</option>
          <option value="confirmed">Confirmada</option>
          <option value="canceled">Cancelada</option>
        </Select>

        <Label>Descuento (%):</Label>
        <Input type="number" name="discount" placeholder="Descuento (%)" value={newReserva.discount} onChange={handleInputChange} min="0" max="100" />

        <Label>Nota:</Label>
        <TextArea name="note" placeholder="Nota" value={newReserva.note} onChange={handleInputChange} rows="4" cols="50" />

        {newReserva.booking_id ? (
          <Button onClick={handleSaveUpdate}>Guardar Cambios</Button>
        ) : (
          <Button onClick={handleAddReserva} disabled={!isFormValid()}>Guardar Nueva Reserva</Button>
        )}
      </FormSection>

      <FormSection>
        <Label>Filtrar por:</Label>
        <Select value={filterField} onChange={handleFilterChange}>
          <option value="">Seleccionar filtro</option>
          <option value="user">Usuario</option>
          <option value="cabin">Cabaña</option>
          <option value="date">Fecha</option>
        </Select>
        {filterField === 'user' && (
          <Select value={filterValue} onChange={handleFilterValueChange}>
            <option value="">Seleccionar usuario</option>
            {usuarios.map(user => (
              <option key={user.user_id} value={user.user_id}>{`${user.first_name} (${user.email})`}</option>
            ))}
          </Select>
        )}
        {filterField === 'cabin' && (
          <Select value={filterValue} onChange={handleFilterValueChange}>
            <option value="">Seleccionar cabaña</option>
            {cabanas.map(cabin => (
              <option key={cabin.cabin_id} value={cabin.cabin_id}>{cabin.name}</option>
            ))}
          </Select>
        )}
        {filterField === 'date' && (
          <Input type="date" value={filterValue} onChange={handleFilterValueChange} />
        )}
      </FormSection>

      <table>
        <thead>
          <tr>
            <th>ID Reserva</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Cabaña Reservada</th>
            <th>Descuento</th>
            <th>Notas</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservas.map(reserva => (
            <React.Fragment key={reserva.booking_id}>
              <tr>
                <td>{reserva.booking_id}</td>
                <td>{usuarios.find(user => user.user_id === reserva.user_id)?.first_name}</td>
                <td>{usuarios.find(user => user.user_id === reserva.user_id)?.email}</td>
                <td>{cabanas.find(cabin => cabin.cabin_id === reserva.cabin_id)?.name}</td>
                <td>{reserva.discount && reserva.discount !== 0 ? reserva.discount : '-'}</td>
                <td>{reserva.note}</td>
                <StatusCell status={reserva.status}>{reserva.status}</StatusCell>
              </tr>
              <tr>
                <td colSpan="6">
                  <Button onClick={() => handleUpdateReserva(reserva.booking_id)}>Editar</Button>
                  <Button onClick={() => handleDeleteReserva(reserva.booking_id)}>Eliminar</Button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default GestionReservas;
