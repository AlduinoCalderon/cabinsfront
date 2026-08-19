import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../../services/supabaseClient';
import cabinService from '../../services/cabinService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: ${props => props.theme.textColor || '#333'};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ImageGallery = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
`;

const Description = styled.p`
  line-height: 1.6;
  font-size: 1.1rem;
`;

const Features = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FeatureTag = styled.span`
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
`;

const BookingSection = styled.div`
  background: ${props => props.theme.bgColor === '#1a1a1a' ? '#2d2d2d' : '#ffffff'};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;

  .react-datepicker {
    font-family: inherit;
    border: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const ReserveButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const CabinDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [cabin, setCabin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState([]);
  
  // Date selection states
  const [startDate, setStartDate] = useState(null);
  const [nights, setNights] = useState(1);
  const [bookedNights, setBookedNights] = useState(new Set());

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // Fetch cabin info
        const cabins = await cabinService.getAllCabins();
        const found = cabins.find(c => c.id === id);
        if (found) setCabin(found);
        
        // Fetch bookings for this cabin to block dates
        const { data: bookings, error } = await supabase
          .from('mogote_bookings')
          .select('start_date, end_date')
          .eq('cabin_id', id)
          .neq('status', 'cancelled')
          .gte('end_date', new Date().toISOString().split('T')[0]);
          
        if (error) throw error;
        
        const nightsBlocked = new Set();
        bookings.forEach(booking => {
          let curr = new Date(booking.start_date);
          const end = new Date(booking.end_date);
          while (curr < end) {
            nightsBlocked.add(curr.toISOString().split('T')[0]);
            curr.setDate(curr.getDate() + 1);
          }
        });
        
        setBookedNights(nightsBlocked);
      } catch (err) {
        console.error("Error fetching cabin details:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchDetails();
  }, [id]);

  const isDateAvailableForNights = (date, selectedNights) => {
    let curr = new Date(date);
    for (let i = 0; i < selectedNights; i++) {
      const dateString = curr.toISOString().split('T')[0];
      if (bookedNights.has(dateString)) return false;
      curr.setDate(curr.getDate() + 1);
    }
    return true;
  };

  const onChangeDate = (date) => {
    setStartDate(date);
  };

  const handleReserve = () => {
    if (!startDate || nights < 1) return;
    
    // Calculate checkOut
    const checkOutDate = new Date(startDate);
    checkOutDate.setDate(checkOutDate.getDate() + nights);
    
    // Preparar el estado para ReservarPage. Nota que ReservarPage espera checkIn/checkOut
    navigate('/reservar', {
      state: {
        cabinData: { ...cabin, imageUrl: cabin.image_url, price: cabin.price_per_night },
        checkIn: startDate.toISOString().split('T')[0],
        checkOut: checkOutDate.toISOString().split('T')[0],
        guests: 1, // Default guests
        nights: nights
      }
    });
  };

  if (loading) return <PageContainer><h2>{t('cabins.loading')}</h2></PageContainer>;
  if (!cabin) return <PageContainer><h2>{t('cabins.notFound')}</h2></PageContainer>;

  return (
    <PageContainer>
      <ContentGrid>
        <InfoSection>
          <ImageGallery>
            <img src={cabin.image_url || '/placeholder-cabin.jpg'} alt={cabin.name} />
          </ImageGallery>
          <Title>{cabin.name}</Title>
          <Price>${cabin.price_per_night} MXN {t('cabins.perNight')}</Price>
          <Features>
            <FeatureTag>👥 {t('cabins.upTo')} {cabin.capacity} {t('cabins.people')}</FeatureTag>
            <FeatureTag>✨ {t('cabins.rating')}</FeatureTag>
            <FeatureTag>📶 {t('cabins.wifi')}</FeatureTag>
          </Features>
          <Description>
            {cabin.description || t('cabins.defaultDescription')}
          </Description>
        </InfoSection>

        <BookingSection>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold' }}>{t('cabins.nights', 'Número de noches')}</label>
            <input 
              type="number" 
              min="1" 
              value={nights} 
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setNights(val > 0 ? val : 1);
                setStartDate(null); // Reset date when nights change
              }}
              style={{
                padding: '0.5rem',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)'
              }}
            />
          </div>

          <h3>{t('cabins.selectCheckIn', 'Selecciona tu fecha de entrada')}</h3>
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            inline
            minDate={new Date()}
            filterDate={(date) => isDateAvailableForNights(date, nights)}
            monthsShown={1}
          />
          <ReserveButton 
            disabled={!startDate}
            onClick={handleReserve}
          >
            {startDate ? t('cabins.continueBooking') : t('cabins.chooseDates')}
          </ReserveButton>
        </BookingSection>
      </ContentGrid>
    </PageContainer>
  );
};

export default CabinDetailsPage;
