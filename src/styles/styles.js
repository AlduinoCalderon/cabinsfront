// ../src/styles.js

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

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

export const DangerButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (min-width: 768px) {
    max-width: 800px;
    margin: auto;
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
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
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

export const CostLabel = styled.span`
  font-weight: bold;
  display: block;
  margin-top: 10px;
  font-size: 1.2em;
`;
