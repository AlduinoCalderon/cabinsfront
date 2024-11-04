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
  const [excludedDates, setExcludedDates] = useState([]);
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

  useEffect(() => {
    if (newReserva.cabin_id) {
      const reservasCabana = reservas.filter(reserva => reserva.cabin_id === parseInt(newReserva.cabin_id));
      const fechasExcluidas = [];
      reservasCabana.forEach(reserva => {
        let startDate = new Date(reserva.start_date);
        let endDate = new Date(reserva.end_date);
        endDate.setDate(endDate.getDate() - 1); // Exclude the end date

        while (startDate <= endDate) {
          fechasExcluidas.push(new Date(startDate));
          startDate.setDate(startDate.getDate() + 1);
        }
      });
      setExcludedDates(fechasExcluidas);
    }
  }, [newReserva.cabin_id, reservas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cabin_id' && value !== newReserva.cabin_id) {
      setNewReserva((prevReserva) => ({
        ...prevReserva,
        cabin_id: value,
        start_date: null, // Reinicia la fecha de inicio
        end_date: null    // Reinicia la fecha de fin
      }));
    } else if (name === 'discount') {
      if (value < 0 || value > 100) return;
    }
    setNewReserva((prevReserva) => ({ ...prevReserva, [name]: value }));
  };
  
  const hasExcludedDates = (startDate, endDate) => {
    const dateRange = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dateRange.push(currentDate.toISOString().split('T')[0]); // Guardamos la fecha en formato YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return excludedDates.some(date => dateRange.includes(date.toISOString().split('T')[0]));
  };
  
  const handleDateChange = (date) => {
    if (!newReserva.start_date || (newReserva.start_date && newReserva.end_date)) {
      setNewReserva({ ...newReserva, start_date: date, end_date: null });
    } else {
      const [start, end] = [newReserva.start_date, date].sort((a, b) => a - b);
      
      // Verificar si hay fechas excluidas en el rango
      if (hasExcludedDates(start, end)) {
        alert("Las fechas seleccionadas incluyen días ya ocupados. Por favor, selecciona otras fechas.");
        setNewReserva({ ...newReserva, start_date: null, end_date: null });
        return;
      }
  
      setNewReserva((prevReserva) => ({
        ...prevReserva,
        start_date: start,
        end_date: end
      }));
    }
  };
  

  const isFormValid = () => {
    return (
      newReserva.user_id &&
      newReserva.cabin_id &&
      newReserva.start_date &&
      newReserva.end_date &&
      newReserva.start_date < newReserva.end_date
    );
  };

  const handleAddOrUpdateReserva = () => {
    if (!isFormValid()) return alert("Por favor, completa todos los campos obligatorios o corrige las fechas.");

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

        // Actualiza la lista de reservas después de agregar
        return fetch('http://localhost:8001/bookings');
    })
    .then(response => response.json())
    .then(data => {
        setReservas(data);
    });

    setNewReserva({ user_id: '', cabin_id: '', start_date: null, end_date: null, status: 'pending', discount: '', note: '' });
    setIsEditing(false);
  };


 const handleDeleteReserva = (id) => {
  if (window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
    fetch(`http://localhost:8001/bookings/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setReservas(reservas.filter(reserva => reserva.booking_id !== id));
    });
  }
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

  const calculateCost = () => {
    if (!newReserva.cabin_id || !newReserva.start_date || !newReserva.end_date) {
      return null;
    }

    const selectedCabin = cabanas.find(cabin => cabin.cabin_id === parseInt(newReserva.cabin_id));
    if (!selectedCabin) {
      return null;
    }

    const nights = (new Date(newReserva.end_date) - new Date(newReserva.start_date)) / (1000 * 60 * 60 * 24);
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
      const selectedDate = new Date(filterValue);
      return selectedDate >= new Date(reserva.start_date) && selectedDate <= new Date(reserva.end_date);
    } else if (filterField === 'id' && filterValue) {
      return reserva.booking_id === parseInt(filterValue);
    }
    return true;
  });

  const nights = newReserva.start_date && newReserva.end_date ? 
    (new Date(newReserva.end_date) - new Date(newReserva.start_date)) / (1000 * 60 * 60 * 24) : 
    0;

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
          minDate={new Date()}
          excludeDates={excludedDates}
          disabled={!newReserva.cabin_id}
          inline
        />
        <Legend>
          {newReserva.start_date && !newReserva.end_date
            ? 'Fecha de llegada capturada, por favor seleccione fecha de salida.'
            : `Reserva de ${nights + 1} días ${nights} ${nights === 1 ? 'noche' : 'noches'}`}
        </Legend>


      </FormSection>

      <FormSection>
        <Label>Estado:</Label>
        <Select name="status" value={newReserva.status} onChange={handleInputChange}>
          <option value="pending">Pendiente</option>
          <option value="confirmed">Confirmada</option>
          <option value="canceled">Cancelada</option>
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

      <Button onClick={handleAddOrUpdateReserva} disabled={!isFormValid()}>
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
                onChange={(date) => setFilterValue(date ? date.toISOString().split('T')[0] : '')}
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
      </FormSection>

      <Table>
        <thead>
          <tr>
            <th>ID de Reserva</th>
            <th>Usuario</th>
            <th>Cabaña</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Estado</th>
            <th>Notas</th>
            <th>Descuento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservas.map(reserva => (
            <tr key={reserva.booking_id}>
              <td>{reserva.booking_id}</td>
              <td>{usuarios.find(user => user.user_id === reserva.user_id)?.first_name || 'Usuario no encontrado'}</td>
              <td>{cabanas.find(cabin => cabin.cabin_id === reserva.cabin_id)?.name || 'Cabaña no encontrada'}</td>
              <td>{new Date(reserva.start_date).toLocaleDateString()}</td>
              <td>{new Date(reserva.end_date).toLocaleDateString()}</td>
              <StatusCell status={reserva.status}>{reserva.status}</StatusCell>
              <td>{reserva.note}</td>
              <td>{reserva.discount ? `${reserva.discount}%` : 'N/A'}</td>
              <td>
                <button onClick={() => handleEditReserva(reserva)}>Editar</button>
                <button onClick={() => handleDeleteReserva(reserva.booking_id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GestionReservas;
