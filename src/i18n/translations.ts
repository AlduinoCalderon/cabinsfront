export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  en: {
    cabins: 'Cabins',
    reserve: 'Reserve',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
  },
  es: {
    cabins: 'Cabañas',
    reserve: 'Reservar',
    contact: 'Contacto',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    logout: 'Cerrar Sesión',
  },
}; 