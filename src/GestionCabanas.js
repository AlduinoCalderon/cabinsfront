import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import CabinTable from './components/CabinTable';
import CabinForm from './components/CabinForm';
import ImageUpload from './components/ImageUpload';
import ImageGallery from './components/ImageGallery';
import { API_URL } from './constants';
import useFetchData from './hooks/useFetchData';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (min-width: 768px) {
    max-width: 800px;
    margin: auto;
  }
`;

const GestionCabanas = () => {
  const [cabanas, setCabanas] = useState([]);
  const [newCabin, setNewCabin] = useState({
    name: '',
    capacity: '',
    description: '',
    location: '',
    cost_per_night: '',
    is_active: true
  });
  const [images, setImages] = useState([]);
  const [selectedCabin, setSelectedCabin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const refContainer = useRef(null);

  const fetchData = (url, setter) => {
    fetch(url)
      .then(response => response.json())
      .then(data => setter(data));
  };

  useEffect(() => {
    fetchData(`${API_URL}/cabins`, setCabanas);
  }, []);

  useEffect(() => {
    if (selectedCabin) {
      fetchData(`${API_URL}/images?cabin_id=${selectedCabin.cabin_id}`, setImages);
    }
  }, [selectedCabin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCabin((prevCabin) => ({ ...prevCabin, [name]: value }));
  };

  const isFormValid = () => {
    return (
      newCabin.name &&
      newCabin.capacity &&
      newCabin.cost_per_night
    );
  };

  const handleAddOrUpdateCabin = () => {
    if (!isFormValid()) return alert("Por favor, completa todos los campos obligatorios.");

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/cabins/${newCabin.cabin_id}` : `${API_URL}/cabins`;

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCabin)
    })
    .then(response => response.json())
    .then(data => {
        if (isEditing) {
            setCabanas(cabanas.map(cabin => cabin.cabin_id === newCabin.cabin_id ? newCabin : cabin));
        } else {
            setCabanas([...cabanas, data]);
        }
        setNewCabin({
          name: '',
          capacity: '',
          description: '',
          location: '',
          cost_per_night: '',
          is_active: true
        });
        setIsEditing(false);
    });
  };

  const handleDeleteCabin = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cabaña?")) {
      fetch(`${API_URL}/cabins/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        setCabanas(cabanas.map(cabin => cabin.cabin_id === id ? { ...cabin, is_active: false } : cabin));
      });
    }
  };

  const refreshImages = () => {
    if (selectedCabin) {
      fetchData(`${API_URL}/images?cabin_id=${selectedCabin.cabin_id}`, setImages);
    }
  };

  return (
    <Container ref={refContainer}>
      <NavBar />
      <h1>Gestión de Cabañas</h1>

      <CabinForm
        newCabin={newCabin}
        handleInputChange={handleInputChange}
        isFormValid={isFormValid}
        handleAddOrUpdateCabin={handleAddOrUpdateCabin}
        isEditing={isEditing}
      />

      {selectedCabin && (
        <>
          <ImageUpload cabinId={selectedCabin.cabin_id} refreshImages={refreshImages} />
          <ImageGallery images={images} />
        </>
      )}

      <CabinTable
        cabanas={cabanas}
        handleDeleteCabin={handleDeleteCabin}
        setSelectedCabin={setSelectedCabin}
        setIsEditing={setIsEditing}
        setNewCabin={setNewCabin}
      />
    </Container>
  );
};

export default GestionCabanas;
