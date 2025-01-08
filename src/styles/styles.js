import styled from 'styled-components'; 

export const Button = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    pointer-events: none;
  }
  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 12px; /* Reducir el tamaño de la fuente */
    padding: 8px 16px; /* Reducir el tamaño del botón */
  }
`;
export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem; /* Ajuste relativo de fuente */
  
  @media (max-width: 768px) {
    font-size: 0.9rem; /* Ajuste para pantallas pequeñas */
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: auto;
  width: 90%;

  @media (min-width: 768px) {
    max-width: 800px;
    margin: auto;
  }
`;
export const DangerButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;


export const FormSection = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

export const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem; /* Ajuste relativo de fuente */
  
  @media (max-width: 768px) {
    font-size: 0.9rem; /* Ajuste para pantallas pequeñas */
  }
`;


export const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const Legend = styled.legend`
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
export const CostLabel = styled.span`
  font-weight: bold;
  display: block;
  margin-top: 10px;
  font-size: 1.2em;
`;
// ../src/styles.js
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
  display: block;
    grid-template-columns: 1fr; 
  }
`;


export const DatePickerWrapper = styled.div`
  grid-column: 1 / 2;
`;

export const ControlsWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  grid-column: 2 / 3;
`;
export const BlueButton = styled(Button)`
  background-color: #007bff;

  &:hover {
    background-color: #0056b3;
  }
`;

export const RedButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

export const YellowButton = styled(Button)`
  background-color:rgb(179, 130, 24);

  &:hover {
    background-color:rgb(124, 91, 19);
  }
`;
