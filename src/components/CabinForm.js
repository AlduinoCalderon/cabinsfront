import React from 'react';
import styled from 'styled-components';

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
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

const CabinForm = ({ 
  newCabin, 
  handleInputChange, 
  handleAddOrUpdateCabin, 
  isFormValid, 
  isEditing 
}) => {
  return (
    <FormSection>
      <Label>Nombre de la Cabaña:</Label>
      <Input 
        name="name" 
        value={newCabin.name} 
        onChange={handleInputChange} 
      />

      <Label>Capacidad:</Label>
      <Input 
        type="number" 
        name="capacity" 
        value={newCabin.capacity} 
        onChange={handleInputChange} 
      />

      <Label>Descripción:</Label>
      <TextArea 
        name="description" 
        value={newCabin.description} 
        onChange={handleInputChange} 
      />

      <Label>Ubicación:</Label>
      <Input 
        name="location" 
        value={newCabin.location} 
        onChange={handleInputChange} 
      />

      <Label>Costo por Noche:</Label>
      <Input 
        type="number" 
        name="cost_per_night" 
        value={newCabin.cost_per_night} 
        onChange={handleInputChange} 
      />

      <Button 
        onClick={handleAddOrUpdateCabin} 
        disabled={!isFormValid()}
      >
        {isEditing ? 'Actualizar Cabaña' : 'Agregar Cabaña'}
      </Button>
    </FormSection>
  );
};

export default CabinForm;
