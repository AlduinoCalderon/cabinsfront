// ../src/GestionReservas.js

import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import ReservationTable from './components/ReservationTable';
import { fetchBookings, fetchCabins, fetchUsers, createBooking, updateBooking } from './services/api';
import { ReservationForm, FormSection, Label, Select, TextArea, Button, Legend, CostLabel } from './components/ReservationForm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (min-width: 768px) {
    max-width: 800px;
    margin: auto;
  }
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
    discount: '0',
    note: ''
  });
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); 
  const [isEditing, setIsEditing] = useState(false);
  const [excludedDates, setExcludedDates] = useState([]);
  const refContainer = useRef(null);

  useEffect(() => {
    fetchBookings().then(data => setReservas(data));
    fetchCabins().then(data => setCabanas(data));
    fetchUsers().then(data => setUsuarios(data));
  }, []);

  useEffect(() => {
    if (newReserva.cabin_id) {
      const reservasCabana = reservas.filter(reserva => reserva.cabin_id === parseInt(newReserva.cabin_id) && reserva.status !== 'canceled' && (!isEditing || reserva.booking_id !== newReserva.booking_id));
      const fechasExcluidas = [];
      reservasCabana.forEach(reserva => {
        let startDate = moment(reserva.start_date);
        for (let i = 0; i < reserva.nights; i++) {
          fechasExcluidas.push(startDate.toDate());
          startDate.add(1, 'days');
        }
      });
      setExcludedDates(fechasExcluidas);
    }
  }, [newReserva.cabin_id, reservas, isEditing, newReserva.booking_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cabin_id' && value !== newReserva.cabin_id) {
      setNewReserva((prevReserva) => ({
        ...prevReserva,
        cabin_id: value,
        start_date: null, 
        nights: 1,
        discount: '0'
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
      const endDate = moment(newReserva.start_date).add(selectedNights - 1, 'days').toDate(); 
      setNewReserva(prev => ({ ...prev, end_date: endDate, nights: selectedNights }));
    }
  };

  const handleDateChange = (date) => {
    const adjustedDate = moment(date).tz('America/Mexico_City', true).startOf('day').toDate();
    setNewReserva({ ...newReserva, start_date: adjustedDate, nights: 1 });
    setNights(1);
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
    const requestFunc = isEditing ? updateBooking : createBooking;
    const requestId = isEditing ? newReserva.booking_id : null;

    requestFunc(requestId, newReserva)
      .then(data => {
        if (isEditing) {
          setReservas(reservas.map(reserva => reserva.booking_id === newReserva.booking_id ? newReserva : reserva));
        } else {
          setReservas([...reservas, data.Booking]);
        }
        return fetchBookings();
      })
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

        const cancelNote = `Reserva cancelada el día: ${moment().format('YYYY-MM-DD')}`;

        updateBooking(id, { ...reservaToCancel, status: 'canceled', note: cancelNote })
          .then(() => {
            setReservas(reservas.map(reserva => reserva.booking_id === id ? { ...reserva, status: 'canceled', note: cancelNote } : reserva));
          });
      }
    }
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

  const getAvailableNights = () => {
    if (!newReserva.start_date || !newReserva.cabin_id) return [];

    const availableNights = [1, 2, 3, 4, 5, 6, 7];
    const reservasCabana = reservas.filter(reserva => reserva.cabin_id === parseInt(newReserva.cabin_id) && reserva.status !== 'canceled' && (!isEditing || reserva.booking_id !== newReserva.booking_id));

    availableNights.forEach((night, index) => {
      const checkDate = moment(newReserva.start_date).add(night - 1, 'days');
      const isOccupied = reservasCabana.some(reserva => {
        const startDate = moment(reserva.start_date);
        const endDate = moment(reserva.start_date).add(reserva.nights - 1, 'days');
        return checkDate.isBetween(startDate, endDate, undefined, '[]');
      });
      if (isOccupied) availableNights.splice(index);
    });

    return availableNights;
  };

  return (
    <Container ref={refContainer}>
      <NavBar />
      <h1>Gestión de Reservas</h1>

      <ReservationForm
        newReserva={newReserva}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        handleNightsChange={handleNightsChange}
        isFormValid={isFormValid}
        calculateCost={calculateCost}
        handleAddOrUpdateReserva={handleAddOrUpdateReserva}
        nights={nights}
        usuarios={usuarios}
        cabanas={cabanas}
        excludedDates={excludedDates}
        getAvailableNights={getAvailableNights}
        isEditing={isEditing} 
      />

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

      <ReservationTable
        filteredReservas={filteredReservas}
        handleEditReserva={handleEditReserva}
        handleDeleteReserva={handleDeleteReserva}
        cabanas={cabanas}
        usuarios={usuarios}
      />
    </Container>
  );
};

export default GestionReservas;
