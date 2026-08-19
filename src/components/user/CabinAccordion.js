import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import cabinService from '../../services/cabinService';
import { supabase } from '../../services/supabaseClient';
import { useTranslation } from 'react-i18next';

const AccordionContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const DateSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const DateInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
`;

const NightsInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 100px;
  color: #333;
  background-color: #fff;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 auto;
  height: 340px;
  overflow-x: auto;
  padding: 10px;
  
  @media (min-width: 768px) {
    overflow-x: hidden;
  }
`;

const Card = styled.div`
  min-width: 70px;
  height: 100%;
  border-radius: 30px;
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: flex-grow 0.5s ease;
  opacity: ${props => props.isAvailable ? 1 : 0.5};
  
  &:hover {
    flex-grow: 7;
  }
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 20px;
  color: #fff;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  width: 100%;
`;

const CardTitle = styled.h3`
  margin-left: 10px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.9);
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.5s ease;
  
  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardDescription = styled.p`
  margin-left: 10px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.9);
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.5s ease;
  transition-delay: 0.1s;
  
  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardPrice = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.9);
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.5s ease;
  transition-delay: 0.2s;
  
  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CabinAccordion = () => {
  const [cabins, setCabins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [nights, setNights] = useState(1);
  const [availableCabins, setAvailableCabins] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  useEffect(() => {
    const fetchCabins = async () => {
      try {
        setLoading(true);
        const data = await cabinService.getAllCabins();
        setCabins(data || []);
        setAvailableCabins(data || []); // Por defecto todas
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las cabañas');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchCabins();
  }, []);
  
  useEffect(() => {
    const checkAvailability = async () => {
      if (!startDate || nights < 1 || cabins.length === 0) return;
      
      try {
        setLoading(true);
        const endTarget = new Date(startDate);
        endTarget.setDate(endTarget.getDate() + nights);
        const endDateStr = endTarget.toISOString().split('T')[0];

        const { data, error } = await supabase
          .from('mogote_bookings')
          .select('cabin_id')
          .neq('status', 'cancelled')
          .lt('start_date', endDateStr)
          .gt('end_date', startDate);

        if (error) throw error;
        
        const overlappingIds = data.map(b => b.cabin_id);
        const available = cabins.filter(c => !overlappingIds.includes(c.id));
        setAvailableCabins(available);
        setLoading(false);
      } catch (err) {
        setError('Error al verificar disponibilidad');
        setLoading(false);
        console.error(err);
      }
    };
    
    checkAvailability();
  }, [startDate, nights, cabins]);
  
  const handleCardClick = (cabinId) => {
    navigate(`/cabins/${cabinId}`);
  };
  
  const isCabinAvailable = (cabinId) => {
    return availableCabins.some(cabin => cabin.id === cabinId);
  };
  
  if (loading && cabins.length === 0) {
    return <div>{t('cabins.loading')}</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <AccordionContainer>
      <DateSelector>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-start' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{t('cabins.checkIn')}</label>
          <DateInput 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-start' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{t('cabins.nights')}</label>
          <NightsInput 
            type="number" 
            value={nights}
            onChange={(e) => setNights(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
        </div>
      </DateSelector>
      
      <CardsContainer>
        {cabins.map((cabin) => (
          <Card 
            key={cabin.id} 
            isAvailable={isCabinAvailable(cabin.id)}
            onClick={() => handleCardClick(cabin.id)}
          >
            <CardImage src={cabin.image_url || '/placeholder-cabin.jpg'} alt={cabin.name} />
            <CardContent>
              <CardTitle>{cabin.name}</CardTitle>
              <CardDescription>{cabin.description}</CardDescription>
              <CardPrice>${cabin.price_per_night} {t('cabins.perNight')}</CardPrice>
            </CardContent>
          </Card>
        ))}
      </CardsContainer>
    </AccordionContainer>
  );
};

export default CabinAccordion; 