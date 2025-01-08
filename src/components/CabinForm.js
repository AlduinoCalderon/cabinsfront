import React from 'react';
import styled from 'styled-components';

import { GridContainer, Button, Input } from '../styles/styles';

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;



export const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
      <GridContainer>
        <div><p><strong>Capacidad:</strong></p>
        <Input 
        type="number" 
        name="capacity" 
        value={newCabin.capacity} 
        onChange={handleInputChange} 
        />
        </div>
        <div><p><strong>Costo por Noche:</strong></p>
          <Input 
            type="number" 
            name="cost_per_night" 
            value={newCabin.cost_per_night} 
            onChange={handleInputChange} 
          />
          </div>
      </GridContainer>
      

      <Label>Descripción:</Label>
      <TextArea 
        name="description" 
        value={newCabin.description} 
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
