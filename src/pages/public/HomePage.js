import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../i18n/config';
import NavBar from '../../components/layout/NavBar';
import mainImage from '../../assets/images/main.jpg';
import senderismoImage from '../../assets/images/senderismo.jpg';
import extremosImage from '../../assets/images/extremos.jpg';
import cabana2 from '../../assets/images/cabanaelmogotedonaisabel2.jpg';
import cabana5 from '../../assets/images/cabanaelmogotedonaisabel5.jpg';
import cabana9 from '../../assets/images/cabanaelmogotedonaisabel9.jpg';
import cabana11 from '../../assets/images/cabanaelmogotedonaisabel11.jpg';
import cabana14 from '../../assets/images/cabanaelmogotedonaisabel14.jpg';
import cabana16 from '../../assets/images/cabanaelmogotedonaisabel16.jpg';
import cabana20 from '../../assets/images/cabanaelmogotedonaisabel20.jpg';
import cabana23 from '../../assets/images/cabanaelmogotedonaisabel23.jpg';
import cabana26 from '../../assets/images/cabanaelmogotedonaisabel26.jpg';

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.bgColor};
  transition: all 0.3s ease;
`;

const HeroSection = styled.div`
  height: 80vh;
  background-image: url(${mainImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 30px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const HeroButton = styled.button`
  background-color: ${props => props.theme.colors?.primary || '#3498db'};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 2rem auto 0;
  display: block;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${props => props.theme.colors?.primary || '#3498db'}, ${props => props.theme.colors?.secondary || '#2980b9'});
    z-index: -1;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);

    &:before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: ${props => props.theme.textColor};
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ServicesSection = styled.section`
  padding: 80px 20px;
`;

const ServicesContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 400px;
  display: flex;
  gap: 15px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 992px) {
    height: 300px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    gap: 20px;
    padding: 20px;
  }
`;

const ServiceCard = styled.div`
  flex: ${props => props.expanded ? '3' : '1'};
  min-width: 0;
  height: 400px;
  border-radius: 15px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
    pointer-events: none;
    transition: opacity 0.6s ease;
  }
  
  @media (max-width: 992px) {
    height: 300px;
  }
  
  @media (max-width: 768px) {
    flex: none;
    height: 250px;
    margin-bottom: 0;
    transform: none !important;
  }
  
  &:hover {
    flex: ${props => props.expanded ? '3' : '2'};
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    
    &::before {
      opacity: 0.9;
    }
    
    @media (max-width: 768px) {
      transform: none;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
  }
`;

const ServiceContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 20px 10px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;
  transition: transform 0.3s ease;
  
  ${ServiceCard}:hover & {
    transform: translateY(-10px);
  }
  
  @media (max-width: 768px) {
    padding: 15px 10px;
    transform: none !important;
  }
`;

const ServiceTitle = styled.h3`
  font-size: clamp(1rem, 1.2vw, 1.3rem);
  margin-bottom: 10px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  transition: all 0.3s ease;
  width: 100%;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
`;

const ServiceDescription = styled.p`
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  line-height: 1.4;
  margin: 0 auto;
  padding: 0 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  height: 0;
  overflow: hidden;
  max-width: 200px;
  visibility: hidden;
  color: white;
  
  ${ServiceCard}:hover & {
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(20px);
        visibility: hidden;
      }
      100% {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
      }
    }
    animation: fadeIn 0.3s 0.6s forwards;
    height: auto;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    max-width: 100%;
    line-height: 1.3;
    opacity: 1;
    transform: none;
    height: auto;
    visibility: visible;
  }
`;

const GallerySection = styled.section`
  padding: 80px 20px;
  background-color: ${props => props.theme.sectionBg};
  transition: all 0.3s ease;
`;

const GalleryTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: ${props => props.theme.textColor};
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const AboutSection = styled.section`
  padding: 4rem 2rem;
  background-color: ${props => props.theme.colors?.background};
  color: ${props => props.theme.colors?.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AboutText = styled.div`
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: ${props => props.theme.colors?.text};
  }
`;

const HomePage = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();

  const services = [
    {
      title: t.home.services.cabins.title,
      description: t.home.services.cabins.desc,
      image: cabana2
    },
    {
      title: t.home.services.hiking.title,
      description: t.home.services.hiking.desc,
      image: senderismoImage
    },
    {
      title: t.home.services.extreme.title,
      description: t.home.services.extreme.desc,
      image: extremosImage
    },
    {
      title: t.home.services.air.title,
      description: t.home.services.air.desc,
      image: cabana11
    },
    {
      title: t.home.services.sunset.title,
      description: t.home.services.sunset.desc,
      image: cabana14
    }
  ];

  const galleryImages = [
    { src: cabana20, alt: t.gallery.images[0] },
    { src: cabana23, alt: t.gallery.images[1] },
    { src: cabana26, alt: t.gallery.images[2] },
    { src: cabana5, alt: t.gallery.images[3] },
    { src: cabana9, alt: t.gallery.images[4] },
    { src: cabana16, alt: t.gallery.images[5] }
  ];

  return (
    <HomeContainer theme={theme}>
      <NavBar />
      <HeroSection>
        <HeroContent>
          <HeroTitle>{t.home.hero.title}</HeroTitle>
          <HeroSubtitle>{t.home.hero.subtitle}</HeroSubtitle>
          <HeroButton onClick={() => navigate('/cabins')}>
            {t.home.hero.button}
          </HeroButton>
        </HeroContent>
      </HeroSection>

      <AboutSection>
        <SectionTitle>{t.home.about.title}</SectionTitle>
        <AboutContent>
          <AboutImage src={cabana2} alt="El Mogote Doña Isabel" />
          <AboutText>
            <p>{t.home.about.text1}</p>
            <p>{t.home.about.text2}</p>
          </AboutText>
        </AboutContent>
      </AboutSection>

      <ServicesSection>
        <SectionTitle theme={theme}>{t.home.services.title}</SectionTitle>
        <ServicesContainer>
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              image={service.image}
              expanded={expandedCard === index}
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            >
              <ServiceContent>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceContent>
            </ServiceCard>
          ))}
        </ServicesContainer>
      </ServicesSection>

      <GallerySection theme={theme}>
        <GalleryTitle theme={theme}>{t.gallery.title}</GalleryTitle>
        <GalleryGrid>
          {galleryImages.map((image, index) => (
            <GalleryImage key={index} src={image.src} alt={image.alt} />
          ))}
        </GalleryGrid>
      </GallerySection>
    </HomeContainer>
  );
};

export default HomePage; 