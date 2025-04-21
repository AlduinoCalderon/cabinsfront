import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CabinAccordion from '../../components/user/CabinAccordion';
import axios from 'axios';

const CabinsPage = () => {
  const [cabins, setCabins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCabins = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/cabins');
        setCabins(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las cabañas');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCabins();
  }, []);

  return (
    <CabinsContainer>
      <PageHeader>
        <PageTitle>Nuestras Cabañas</PageTitle>
        <PageDescription>
          Descubre nuestras acogedoras cabañas, perfectas para una escapada en la naturaleza.
          Selecciona tus fechas y encuentra la cabaña ideal para tu próxima aventura.
        </PageDescription>
      </PageHeader>

      {loading ? (
        <LoadingContainer>
          <LoadingSpinner>Cargando cabañas...</LoadingSpinner>
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      ) : (
        <CabinAccordion />
      )}
    </CabinsContainer>
  );
};

const CabinsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const LoadingSpinner = styled.div`
  font-size: 1.2rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 1.2rem;
  padding: 20px;
  background-color: #fff5f5;
  border-radius: 5px;
  text-align: center;
`;

export default CabinsPage; 