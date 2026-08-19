import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import bookingService from '../../services/bookingService';
import { useTranslation } from 'react-i18next';

const ReservarPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const cabinData = location.state?.cabinData;
  const [formData, setFormData] = useState({
    checkIn: location.state?.checkIn || '',
    checkOut: location.state?.checkOut || '',
    guests: location.state?.guests || 1,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!cabinData) {
    return (
      <Container>
        <ErrorMessage>{t('reservar.notFound')}</ErrorMessage>
      </Container>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const reservationData = {
        cabin_id: cabinData.id,
        start_date: formData.checkIn,
        end_date: formData.checkOut,
        guests: parseInt(formData.guests),
        special_requests: formData.specialRequests,
        status: 'pending'
      };

      const response = await bookingService.createBooking(reservationData);

      if (response) {
        navigate('/reservas', { 
          state: { 
            message: 'Reserva creada exitosamente',
            reservation: response
          }
        });
      }
    } catch (err) {
      setError(err.message || 'Error al crear la reserva');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>{t('reservar.title')}</Title>
      <CabinInfo>
        <CabinImage src={cabinData.imageUrl} alt={cabinData.name} />
        <CabinDetails>
          <h2>{cabinData.name}</h2>
          <p>{cabinData.description}</p>
          <Price>${cabinData.price} {t('cabins.perNight')}</Price>
        </CabinDetails>
      </CabinInfo>

      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>{t('reservar.checkIn')}</Label>
            <Input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>{t('reservar.checkOut')}</Label>
            <Input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleInputChange}
              min={formData.checkIn || new Date().toISOString().split('T')[0]}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>{t('reservar.guests')}</Label>
            <Input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              min="1"
              max={cabinData.capacity}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>{t('reservar.specialRequests')}</Label>
            <TextArea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              placeholder={t('reservar.specialRequestsPlaceholder')}
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? t('reservar.processing') : t('reservar.confirm')}
          </SubmitButton>
        </Form>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--first-color);
  margin-bottom: 2rem;
`;

const CabinInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CabinImage = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const CabinDetails = styled.div`
  flex: 1;

  h2 {
    margin-bottom: 1rem;
    color: var(--first-color);
  }

  p {
    color: var(--text-color);
    margin-bottom: 1rem;
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c5282;
`;

const FormContainer = styled.div`
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--text-color);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--bg-color);
  color: var(--text-color);

  &:focus {
    outline: none;
    border-color: #2c5282;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  background-color: var(--bg-color);
  color: var(--text-color);

  &:focus {
    outline: none;
    border-color: #2c5282;
  }
`;

const SubmitButton = styled.button`
  background-color: #2c5282;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a4365;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 0.5rem;
  background-color: #fff5f5;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export default ReservarPage; 