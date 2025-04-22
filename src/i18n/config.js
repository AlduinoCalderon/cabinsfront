import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones
import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';

// Inicializar i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      es: {
        translation: esTranslations
      }
    },
    fallbackLng: 'es',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    }
  });

export const translations = {
  es: {
    home: {
      hero: {
        title: "Cabañas el Mogote Doña Isabel",
        subtitle: "Tu refugio entre las nubes",
        button: "Conoce nuestras cabañas"
      },
      about: {
        title: "Sobre Nosotros",
        text1: "Ubicadas en el corazón de San José del Pacífico, nuestras cabañas ofrecen una experiencia única de conexión con la naturaleza. Cada cabaña está diseñada para brindar comodidad y privacidad, con vistas espectaculares a las montañas y al bosque.",
        text2: "Nuestro compromiso es ofrecerte una estancia inolvidable, donde puedas disfrutar de la tranquilidad del bosque, el aire fresco de la montaña y la calidez de nuestra atención personalizada."
      },
      cabins: {
        title: "Nuestras Cabañas",
        items: [
          {
            title: "Cabaña Familiar",
            description: "Amplia cabaña ideal para familias, con capacidad para 6 personas."
          },
          {
            title: "Cabaña Romántica",
            description: "Cabaña acogedora perfecta para parejas, con jacuzzi privado."
          }
        ],
        viewButton: "Ver más"
      },
      services: {
        title: 'Nuestros Servicios',
        cabins: {
          title: 'Cabañas',
          desc: 'Alojamiento cómodo y acogedor en medio de la naturaleza'
        },
        hiking: {
          title: 'Senderismo',
          desc: 'Explora los hermosos senderos naturales que rodean nuestras cabañas'
        },
        extreme: {
          title: 'Aventura',
          desc: 'Actividades extremas para los más aventureros'
        },
        air: {
          title: 'Aire Libre',
          desc: 'Disfruta del aire fresco y las vistas panorámicas'
        },
        sunset: {
          title: 'Atardeceres',
          desc: 'Maravíllate con los espectaculares atardeceres de la montaña'
        }
      }
    },
    gallery: {
      title: 'Galería',
      images: [
        'Vista exterior de la cabaña',
        'Ambiente natural y paisaje',
        'Interior acogedor',
        'Área de descanso',
        'Vistas a la montaña',
        'Atardecer en las montañas'
      ]
    },
    cabins: 'Cabañas',
    reserve: 'Reservar',
    contact: 'Contacto',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    welcome: 'Bienvenido a Cabañas El Mogote',
    subtitle: 'Disfruta de una experiencia única en contacto con la naturaleza',
    about: 'Sobre Nosotros',
    aboutText: 'Cabañas El Mogote ofrece un refugio perfecto para aquellos que buscan escapar de la rutina y conectarse con la naturaleza. Nuestras cabañas están diseñadas para brindar comodidad y tranquilidad en un entorno natural único.',
    ourCabins: 'Nuestras Cabañas',
    familyCabin: 'Cabaña Familiar',
    familyCabinDesc: 'Amplia cabaña ideal para familias, con todas las comodidades.',
    romanticCabin: 'Cabaña Romántica',
    romanticCabinDesc: 'Perfecta para parejas, con vista panorámica y jacuzzi.',
    viewDetails: 'Ver Detalles',
    reserveNow: 'Reservar Ahora'
  },
  en: {
    home: {
      hero: {
        title: "Cabañas el Mogote Doña Isabel",
        subtitle: "Your refuge among the clouds",
        button: "Discover our cabins"
      },
      about: {
        title: "About Us",
        text1: "Located in the heart of San José del Pacífico, our cabins offer a unique experience of connection with nature. Each cabin is designed to provide comfort and privacy, with spectacular views of the mountains and forest.",
        text2: "Our commitment is to offer you an unforgettable stay, where you can enjoy the tranquility of the forest, the fresh mountain air, and the warmth of our personalized attention."
      },
      cabins: {
        title: "Our Cabins",
        items: [
          {
            title: "Family Cabin",
            description: "Spacious cabin ideal for families, with capacity for 6 people."
          },
          {
            title: "Romantic Cabin",
            description: "Cozy cabin perfect for couples, with private jacuzzi."
          }
        ],
        viewButton: "View more"
      },
      services: {
        title: 'Our Services',
        cabins: {
          title: 'Cabins',
          desc: 'Comfortable and cozy accommodation in the middle of nature'
        },
        hiking: {
          title: 'Hiking',
          desc: 'Explore the beautiful natural trails surrounding our cabins'
        },
        extreme: {
          title: 'Adventure',
          desc: 'Extreme activities for the most adventurous'
        },
        air: {
          title: 'Outdoor',
          desc: 'Enjoy the fresh air and panoramic views'
        },
        sunset: {
          title: 'Sunsets',
          desc: 'Marvel at the spectacular mountain sunsets'
        }
      }
    },
    gallery: {
      title: 'Gallery',
      images: [
        'Cabin exterior view',
        'Natural environment and landscape',
        'Cozy interior',
        'Rest area',
        'Mountain views',
        'Sunset in the mountains'
      ]
    },
    cabins: 'Cabins',
    reserve: 'Reserve',
    contact: 'Contact',
    login: 'Login',
    logout: 'Logout',
    welcome: 'Welcome to Cabañas El Mogote',
    subtitle: 'Enjoy a unique experience in contact with nature',
    about: 'About Us',
    aboutText: 'Cabañas El Mogote offers a perfect refuge for those seeking to escape routine and connect with nature. Our cabins are designed to provide comfort and tranquility in a unique natural environment.',
    ourCabins: 'Our Cabins',
    familyCabin: 'Family Cabin',
    familyCabinDesc: 'Spacious cabin ideal for families, with all amenities.',
    romanticCabin: 'Romantic Cabin',
    romanticCabinDesc: 'Perfect for couples, with panoramic view and jacuzzi.',
    viewDetails: 'View Details',
    reserveNow: 'Reserve Now'
  }
};

export default i18n; 