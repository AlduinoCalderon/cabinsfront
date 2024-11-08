// src/GestionReservas.js
import React, { useState, useEffect, useRef } from 'react';
import TopBar from './components/TopBar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import moment from 'moment-timezone';

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

const Legend = styled.p`
  margin-top: 10px;
  font-weight: bold;
`;

const CostLabel = styled.div`
  margin-top: 20px;
  font-weight: bold;
`;

const GestionReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cabanas, setCabanas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [nights, setNights] = useState(1);
  const [newReserva, setNewReserva] = useState({
    user_id: '',
    cabin_id: '',
    start_date: null,
    nights: 1,
    status: 'pending',
    discount: '',
    note: ''
  });
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); // Nuevo filtro por estado
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
    if (name === 'cabin_id' && value !== newReserva.cabin_id) {
      setNewReserva((prevReserva) => ({
        ...prevReserva,
        cabin_id: value,
        start_date: null, // Reinicia la fecha de inicio
        nights: 1    // Reinicia la fecha de fin
      }));
    } else if (name === 'discount') {
      if (value < 0 || value > 100) return;
    }
    setNewReserva((prevReserva) => ({ ...prevReserva, [name]: value }));
  };

  const handleNightsChange = (e) => {
    const selectedNights = parseInt(e.target.value, 10);
    setNights(selectedNights);
    
    if (newReserva.start_date) {
      const endDate = moment(newReserva.start_date).add(selectedNights - 1, 'days').toDate(); // Actualiza la fecha de salida
      setNewReserva(prev => ({ ...prev, end_date: endDate, nights: selectedNights }));
    }
  };

  const handleDateChange = (date) => {
    const adjustedDate = moment(date).tz('America/Mexico_City', true).startOf('day').toDate();
    const noches = setNights("");
    setNewReserva({ ...newReserva, nights: noches, start_date: adjustedDate });
    // Actualiza automáticamente la fecha de fin al seleccionar la fecha de inicio
    if (nights) {
      const endDate = moment(adjustedDate).add(nights - 1, 'days').toDate(); // Ajusta la fecha de salida según el número de noches
      setNewReserva(prev => ({ ...prev, end_date: endDate }));
    }
  };

  const isFormValid = () => {
    return (
      newReserva.user_id &&
      newReserva.cabin_id &&
      newReserva.start_date &&
      newReserva.nights
    );
  };

  const handleAddOrUpdateReserva = () => {
    if (!isFormValid() && !isEditing) return alert("Por favor, completa todos los campos obligatorios o corrige las fechas.");

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `http://localhost:8001/bookings/${newReserva.booking_id}` : 'http://localhost:8001/bookings';
    // Imprimir la fecha de llegada antes de enviar
    console.log("Fecha de llegada:", newReserva.start_date);

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

        // Actualiza la lista de reservas después de agregar
        return fetch('http://localhost:8001/bookings');
    })
    .then(response => response.json())
    .then(data => {
        setReservas(data);
    });

    setNewReserva({ user_id: '', cabin_id: '', start_date: null, nights:1, status: 'pending', discount: '', note: '' });
    setIsEditing(false);
  };

  const handleDeleteReserva = (id) => {
    if (window.confirm("¿Estás seguro de que deseas cancelar esta reserva?")){
    const reservaToCancel = reservas.find(reserva => reserva.booking_id === id);
    if (reservaToCancel) {
      const nights = reservaToCancel.nights;
      const selectedCabin = cabanas.find(cabin => cabin.cabin_id === reservaToCancel.cabin_id);
      const discount = reservaToCancel.discount ? (reservaToCancel.discount / 100) : 0;
      const cost = selectedCabin.cost_per_night * nights * (1 - discount);

      const cancelNote = `
      ${reservaToCancel.note}
      Reserva cancelada el día: ${moment().format('YYYY-MM-DD')}
      Fecha de reserva: ${moment(reservaToCancel.start_date).format('YYYY-MM-DD')}
      Noches de reserva: ${nights}
      Costo de reserva: ${cost.toFixed(2)}
            `;

      fetch(`http://localhost:8001/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...reservaToCancel, status: 'canceled', note: cancelNote })
      })
      .then(response => response.json())
      .then(() => {
        setReservas(reservas.map(reserva => reserva.booking_id === id ? { ...reserva, status: 'canceled', note: cancelNote } : reserva));
      });
    }}
  };

  const handleEditReserva = (reserva) => {
    const adjustedStartDate = moment(reserva.start_date).tz('America/Mexico_City', true).startOf('day').toDate();
    reserva.start_date = adjustedStartDate;

    setNewReserva(reserva);
    setNights(reserva.nights);
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

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const calculateCost = () => {
    if (!newReserva.cabin_id || !newReserva.start_date || !newReserva.nights) {
      return null;
    }

    const selectedCabin = cabanas.find(cabin => cabin.cabin_id === parseInt(newReserva.cabin_id));
    if (!selectedCabin) {
      return null;
    }

    const discount = newReserva.discount ? (newReserva.discount / 100) : 0;
    const cost = selectedCabin.cost_per_night * nights * (1 - discount);

    return cost.toFixed(2);
  };

  const filteredReservas = reservas.filter(reserva => {
    if (!reserva.is_active) return false;

    if (filterField === 'user' && filterValue) {
      return reserva.user_id === parseInt(filterValue);
    } else if (filterField === 'cabin' && filterValue) {
      return reserva.cabin_id === parseInt(filterValue);
    } else if (filterField === 'date' && filterValue) {
      const selectedDate = moment(filterValue);
      return selectedDate.isSameOrAfter(moment(reserva.start_date)) && selectedDate.isSameOrBefore(moment(reserva.end_date));
    } else if (filterField === 'id' && filterValue) {
      return reserva.booking_id === parseInt(filterValue);
    } else if (filterStatus && reserva.status !== filterStatus) {
      return false;
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
        <Label>Selecciona la fecha de llegada:</Label>
        <DatePicker
          selected={newReserva.start_date}
          onChange={handleDateChange}
          minDate={new Date()}
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
          {[1, 2, 3, 4, 5, 6, 7].map(night => (
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
      </FormSection>

      <FormSection>
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
      </FormSection>

      {isFormValid() && (
        <CostLabel>
          Costo de la reserva: ${calculateCost()}
        </CostLabel>
      )}

      <Button onClick={handleAddOrUpdateReserva} disabled={!isFormValid() && !isEditing}>
        {isEditing ? 'Actualizar Reserva' : 'Agregar Reserva'}
      </Button>

      <FormSection>
        <Label>Filtrar por:</Label>
        <Select value={filterField} onChange={handleFilterChange}>
          <option value="">Ver todas las reservas</option>
          <option value="id">ID de Reserva</option>
          <option value="user">Usuario</option>
          <option value="cabin">Cabaña</option>
          <option value="date">Fecha</option>
        </Select>

        {filterField && (
          <>
            <Label>Valor del filtro:</Label>
            {filterField === 'date' ? (
              <DatePicker
                selected={filterValue ? new Date(filterValue) : null}
                onChange={(date) => setFilterValue(date ? moment(date).format('YYYY-MM-DD') : '')}
                inline
              />
            ) : (
              <Select value={filterValue} onChange={handleFilterValueChange}>
                <option value="">Ver todo</option>
                {filterField === 'user' && usuarios.map(user => (
                  <option key={user.user_id} value={user.user_id}>{`${user.first_name} (${user.email})`}</option>
                ))}
                {filterField === 'cabin' && cabanas.map(cabin => (
                  <option key={cabin.cabin_id} value={cabin.cabin_id}>{cabin.name}</option>
                ))}
                {filterField === 'id' && reservas.map(reserva => (
                  <option key={reserva.booking_id} value={reserva.booking_id}>{reserva.booking_id}</option>
                ))}
              </Select>
            )}
          </>
        )}
        <Label>Estado de la cabaña:</Label>
        <Select value={filterStatus} onChange={handleFilterStatusChange}>
          <option value="">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="confirmed">Confirmada</option>
          <option value="canceled">Cancelada</option>
        </Select>
      </FormSection>

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
    </Container>
  );
};

export default GestionReservas;
