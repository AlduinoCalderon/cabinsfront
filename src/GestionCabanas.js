import React, { useState, useEffect, useRef } from 'react';
import NavBar from './components/NavBar';
import CabinTable from './components/CabinTable';
import CabinForm from './components/CabinForm';
import { API_URL } from './constants';
import { Container} from './styles/styles';


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
            setCabanas([...cabanas, data.Cabin]);
        }

        return fetch(`${API_URL}/cabins`);
    })
    .then(response => response.json())
    .then(data => {
        setCabanas(data);
    });

    setNewCabin({ name: '', capacity: '', description: '', location: '', cost_per_night: '', is_active: true });
    setIsEditing(false);
  };

  const handleDeleteCabin = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cabaña?")){
      const cabinToDelete = cabanas.find(cabin => cabin.cabin_id === id);
      if (cabinToDelete) {
        fetch(`${API_URL}/cabins/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...cabinToDelete, is_active: false })
        })
        .then(response => response.json())
        .then(() => {
          setCabanas(cabanas.map(cabin => cabin.cabin_id === id ? { ...cabin, is_active: false } : cabin));
        });
      }
    }
  };

  const handleEditCabin = (cabin) => {
    setNewCabin(cabin);
    setIsEditing(true);
    refContainer.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container ref={refContainer}>
      <NavBar />
      <h1>Gestión de Cabañas</h1>

      <CabinForm
        newCabin={newCabin}
        handleInputChange={handleInputChange}
        handleAddOrUpdateCabin={handleAddOrUpdateCabin}
        isFormValid={isFormValid}
        isEditing={isEditing}
      />

      <CabinTable
        cabins={cabanas.filter(cabin => cabin.is_active)}
        handleEditCabin={handleEditCabin}
        handleDeleteCabin={handleDeleteCabin}
      />
    </Container>
  );
};

export default GestionCabanas;
