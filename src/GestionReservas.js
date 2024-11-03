// src/GestionReservas.js
import React, { useState, useEffect, useRef } from 'react';
import TopBar from './components/TopBar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
        return 'white';
    }
  }};
  color: black;
`;

const GestionReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cabanas, setCabanas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newReserva, setNewReserva] = useState({
    user_id: '',
    cabin_id: '',
    start_date: null,
    end_date: null,
    status: 'pending',
    discount: '',
    note: ''
  });
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const refContainer = useRef(null);

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
      if (value < 0 || value > 100) return;
    }
    setNewReserva((prevReserva) => ({ ...prevReserva, [name]: value }));
  };

  const handleDateChange = (date) => {
    if (!newReserva.start_date || (newReserva.start_date && newReserva.end_date)) {
      setNewReserva({ ...newReserva, start_date: date, end_date: null });
    } else {
      setNewReserva((prevReserva) => ({
        ...prevReserva,
        end_date: date
      }));
    }
  };

  const isFormValid = () => {
    return (
      newReserva.user_id &&
      newReserva.cabin_id &&
      newReserva.start_date &&
      newReserva.end_date &&
      newReserva.start_date <= newReserva.end_date
    );
  };

  const handleAddOrUpdateReserva = () => {
    if (!isFormValid()) return alert("Por favor, completa todos los campos obligatorios.");

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `http://localhost:8001/bookings/${newReserva.booking_id}` : 'http://localhost:8001/bookings';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReserva)
    })
    .then(response => response.json())
    .then(data => {
      if (isEditing) {
        setReservas(reservas.map(reserva => reserva.booking_id === newReserva.booking_id ? newReserva : reserva));
      } else {
        setReservas([...reservas, data.Booking]);
      }
      setNewReserva({ user_id: '', cabin_id: '', start_date: null, end_date: null, status: 'pending', discount: '', note: '' });
      setIsEditing(false);
    });
  };

  const handleDeleteReserva = (id) => {
    fetch(`http://localhost:8001/bookings/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setReservas(reservas.filter(reserva => reserva.booking_id !== id));
    });
  };

  const handleEditReserva = (reserva) => {
    setNewReserva(reserva);
    setIsEditing(true);
    refContainer.current.scrollIntoView({ behavior: 'smooth' });
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

    if (filterField === 'user' && filterValue) {
      return reserva.user_id === parseInt(filterValue);
    } else if (filterField === 'cabin' && filterValue) {
      return reserva.cabin_id === parseInt(filterValue);
    } else if (filterField === 'date' && filterValue) {
      const selectedDate = new Date(filterValue);
      return selectedDate >= new Date(reserva.start_date) && selectedDate <= new Date(reserva.end_date);
    } else if (filterField === 'id' && filterValue) {
      return reserva.booking_id === parseInt(filterValue);
    }
    return true;
  });

  return (
    <Container ref={refContainer}>
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
        <Label>Selecciona fechas:</Label>
        <DatePicker
          selected={newReserva.start_date}
          onChange={handleDateChange}
          selectsStart
          startDate={newReserva.start_date}
          endDate={newReserva.end_date}
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
        <input type="number" name="discount" placeholder="Descuento (%)" value={newReserva.discount} onChange={handleInputChange} min="0" max="100" />

        <Label>Notas:</Label>
        <TextArea name="note" placeholder="Notas" value={newReserva.note} onChange={handleInputChange} />
      </FormSection>
      <Button onClick={handleAddOrUpdateReserva} disabled={!isFormValid()}>{isEditing ? 'Modificar Reserva' : 'Agregar Reserva'}</Button>

      <FormSection>
        <Label>Filtrar por:</Label>
        <Select value={filterField} onChange={handleFilterChange}>
          <option value="">Seleccionar filtro</option>
          <option value="user">Usuario</option>
          <option value="cabin">Cabaña</option>
          <option value="date">Fecha</option>
          <option value="id">ID Reserva</option>
        </Select>

        {filterField === 'date' ? (
          <>
            <Label>Selecciona una fecha:</Label>
            <DatePicker
              selected={filterValue ? new Date(filterValue) : null}
              onChange={date => setFilterValue(date)}
              inline
            />
          </>
        ) : filterField && (
          <Select value={filterValue} onChange={handleFilterValueChange}>
            <option value="">Selecciona un valor</option>
            {filterField === 'user' && usuarios.map(user => (
              <option key={user.user_id} value={user.user_id}>{`${user.first_name} (${user.email})`}</option>
            ))}
            {filterField === 'cabin' && cabanas.map(cabin => (
              <option key={cabin.cabin_id} value={cabin.cabin_id}>{cabin.name}</option>
            ))}
            {filterField === 'id' && (
              <input type="number" value={filterValue} onChange={handleFilterValueChange} placeholder="ID Reserva" />
            )}
          </Select>
        )}
      </FormSection>

      <table>
        <thead>
          <tr>
            <th>ID Reserva</th>
            <th>Usuario</th>
            <th>Cabaña</th>
            <th>Fechas</th>
            <th>Estado</th>
            <th>Nota</th>
            <th>Descuento</th>
            <th>Acciones</th>
          </tr>
        </thead>
      <tbody>
        {filteredReservas.map(reserva => {
          // Buscar el usuario correspondiente a la reserva
          const usuario = usuarios.find(user => user.user_id === reserva.user_id) || {};
          const nombreUsuario = usuario.first_name || 'Usuario no encontrado';
          const emailUsuario = usuario.email || '';

          // Buscar la cabaña correspondiente a la reserva
          const cabaña = cabanas.find(cabin => cabin.cabin_id === reserva.cabin_id) || {};
          const nombreCabana = cabaña.name || 'Cabaña no encontrada';

          return (
            <tr key={reserva.booking_id}>
              <td>{reserva.booking_id}</td>
              <td>{`${nombreUsuario} (${emailUsuario})`}</td>
              <td>{nombreCabana}</td>
              <td>{`${new Date(reserva.start_date).toLocaleDateString()} - ${new Date(reserva.end_date).toLocaleDateString()}`}</td>
              <StatusCell status={reserva.status}>{reserva.status}</StatusCell>
              <td>{reserva.note}</td>
              <td>{reserva.discount}</td>
              <td>
                <Button onClick={() => handleEditReserva(reserva)}>Modificar</Button>
                <Button onClick={() => handleDeleteReserva(reserva.booking_id)}>Eliminar</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
      </table>
    </Container>
  );
};

export default GestionReservas;
