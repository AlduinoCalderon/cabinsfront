import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import bookingService from '../../services/bookingService';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h1 {
    color: var(--first-color);
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--section-bg);
  padding-bottom: 1rem;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.active ? 'var(--second-color)' : 'var(--text-color)'};
  border-bottom: ${props => props.active ? '2px solid var(--second-color)' : 'none'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--second-color);
  }
`;

const ContentArea = styled.div`
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  color: var(--text-color);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--section-bg);
  }
  
  th {
    color: var(--first-color);
    font-weight: bold;
    background-color: transparent;
  }
`;

const StatusBadge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  background-color: ${props => {
    switch(props.status) {
      case 'confirmed': return '#d4edda';
      case 'cancelled': return '#f8d7da';
      default: return '#fff3cd';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'confirmed': return '#155724';
      case 'cancelled': return '#721c24';
      default: return '#856404';
    }
  }};
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${props => props.variant === 'danger' ? '#e74c3c' : '#2ecc71'};
  color: white;

  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PlaceholderText = styled.p`
  color: var(--text-color);
  opacity: 0.7;
  font-style: italic;
  margin-top: 1rem;
`;

const DashboardPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        if (isAdmin) {
          const data = await bookingService.getAllBookings();
          setBookings(data);
        } else {
          const data = await bookingService.getUserBookings();
          setBookings(data);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchBookings();
  }, [user, isAdmin]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await bookingService.updateBookingStatus(id, newStatus);
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } catch (error) {
      alert('Error al actualizar la reserva');
    }
  };

  if (!user) return <Container><h2>No tienes acceso. Inicia sesión.</h2></Container>;

  return (
    <Container>
      <Header>
        <h1>{isAdmin ? 'Panel de Administración' : 'Mi Panel'}</h1>
        <p>Hola, {user.profile?.name || user.email}</p>
      </Header>

      <Tabs>
        <Tab active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')}>
          {isAdmin ? 'Todas las Reservas' : 'Mis Reservas'}
        </Tab>
        {!isAdmin && (
          <>
            <Tab active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>Mi Perfil</Tab>
            <Tab active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')}>Favoritos</Tab>
            <Tab active={activeTab === 'payment'} onClick={() => setActiveTab('payment')}>Métodos de Pago</Tab>
          </>
        )}
      </Tabs>

      <ContentArea>
        {activeTab === 'bookings' && (
          loading ? <p>Cargando reservas...</p> : 
          bookings.length === 0 ? <p>No hay reservas registradas.</p> :
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  {isAdmin && <th>Usuario</th>}
                  <th>Cabaña</th>
                  <th>Llegada</th>
                  <th>Salida</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  {isAdmin && <th>Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    {isAdmin && <td>{booking.mogote_profiles?.name || 'Usuario'}</td>}
                    <td>{booking.mogote_cabins?.name}</td>
                    <td>{booking.start_date}</td>
                    <td>{booking.end_date}</td>
                    <td>${booking.total_price}</td>
                    <td><StatusBadge status={booking.status}>{booking.status}</StatusBadge></td>
                    {isAdmin && (
                      <td>
                        {booking.status === 'pending' && (
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <ActionButton onClick={() => handleUpdateStatus(booking.id, 'confirmed')}>Aprobar</ActionButton>
                            <ActionButton variant="danger" onClick={() => handleUpdateStatus(booking.id, 'cancelled')}>Cancelar</ActionButton>
                          </div>
                        )}
                        {booking.status === 'confirmed' && (
                          <ActionButton variant="danger" onClick={() => handleUpdateStatus(booking.id, 'cancelled')}>Cancelar</ActionButton>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2>Personalizar Perfil</h2>
            <PlaceholderText>Aquí podrás actualizar tu nombre, datos de contacto y avatar próximamente.</PlaceholderText>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            <h2>Mis Cabañas Favoritas</h2>
            <PlaceholderText>Aquí aparecerán las cabañas que hayas marcado con un corazón.</PlaceholderText>
          </div>
        )}

        {activeTab === 'payment' && (
          <div>
            <h2>Métodos de Pago</h2>
            <PlaceholderText>Aquí podrás guardar tus tarjetas de crédito/débito para reservas más rápidas.</PlaceholderText>
          </div>
        )}
      </ContentArea>
    </Container>
  );
};

export default DashboardPage;
