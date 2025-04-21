import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 50px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 20px;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 40px;
      height: 2px;
      background-color: #4CAF50;
    }
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 10px;
  }
  
  a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #4CAF50;
    }
  }
`;

const ContactInfo = styled.div`
  p {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 10px;
      color: #4CAF50;
    }
  }
  
  a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #4CAF50;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #4CAF50;
      transform: translateY(-3px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: #ccc;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Sobre Nosotros</h3>
          <p>
            San José del Pacífico es un paraíso en las montañas de Oaxaca, 
            donde podrás disfrutar de la naturaleza y la tranquilidad en nuestras 
            hermosas cabañas.
          </p>
        </FooterSection>
        
        <FooterSection>
          <h3>Enlaces Rápidos</h3>
          <FooterLinks>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/cabanas">Cabañas</Link></li>
            <li><Link to="/reservar">Reservar</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>Contacto</h3>
          <ContactInfo>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
              San José del Pacífico, Oaxaca, México
            </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg>
              <a href="https://wa.me/529511117327" target="_blank" rel="noopener noreferrer">
                +52 951 111 7327
              </a>
            </p>
          </ContactInfo>
        </FooterSection>
        
        <FooterSection>
          <h3>Síguenos</h3>
          <p>Mantente al día con nuestras novedades y ofertas especiales.</p>
          <SocialLinks>
            <a href="https://www.facebook.com/cabanaselmogotedonaIsabelsanjosedelpacifico/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/cabanaselmogotedonaisabel/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@elmogotedonaisabel" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="https://wa.me/529511117327" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {new Date().getFullYear()} Cabañas El Mogote Doña Isabel. Todos los derechos reservados.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 