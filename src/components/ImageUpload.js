import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_URL } from '../constants';

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
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

const ImageUpload = ({ cabinId, refreshImages }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('cabin_id', cabinId);

    try {
      await axios.post(`${API_URL}/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFile(null);
      refreshImages(); // Función para refrescar la lista de imágenes
    } catch (error) {
      console.error('Error al subir la imagen', error);
    }
  };

  return (
    <FormSection>
      <Label>Subir Imagen:</Label>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!file}>Subir</Button>
    </FormSection>
  );
};

export default ImageUpload;
