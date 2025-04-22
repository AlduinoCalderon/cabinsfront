import React, { useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/config';

const AccordionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const AccordionItem = styled.div`
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const AccordionHeader = styled.div`
  padding: 1rem;
  background-color: var(--first-color);
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--second-color);
  }
`;

const AccordionContent = styled.div`
  padding: ${props => props.isOpen ? '1rem' : '0'};
  background-color: white;
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const CabinAccordion = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState(null);

  const cabins = [
    {
      title: t.familyCabin,
      description: t.familyCabinDesc,
      features: [
        'Capacidad para 4 personas',
        'Cocina equipada',
        'Terraza con vista al bosque',
        'Sala de estar',
        'Baño completo'
      ]
    },
    {
      title: t.romanticCabin,
      description: t.romanticCabinDesc,
      features: [
        'Capacidad para 2 personas',
        'Jacuzzi privado',
        'Chimenea',
        'Vista panorámica',
        'Desayuno incluido'
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AccordionContainer>
      {cabins.map((cabin, index) => (
        <AccordionItem key={index}>
          <AccordionHeader onClick={() => toggleAccordion(index)}>
            <h3>{cabin.title}</h3>
            <span>{openIndex === index ? '−' : '+'}</span>
          </AccordionHeader>
          <AccordionContent isOpen={openIndex === index}>
            <p>{cabin.description}</p>
            <ul>
              {cabin.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};

export default CabinAccordion; 