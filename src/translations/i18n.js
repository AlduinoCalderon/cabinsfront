import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      // Navbar
      'nav.home': 'Inicio',
      'nav.cabins': 'Cabañas',
      'nav.reserve': 'Reservar',
      'nav.login': 'Iniciar Sesión',
      'nav.register': 'Registrarse',
      'nav.logout': 'Cerrar Sesión',
      'nav.profile': 'Mi Perfil',
      'nav.settings': 'Configuración',
      'nav.myReservations': 'Mis Reservas',
      'comingSoon': 'Próximamente',

      // Auth Modal
      'auth.login': 'Iniciar Sesión',
      'auth.register': 'Registrarse',
      'auth.email': 'Correo Electrónico',
      'auth.password': 'Contraseña',
      'auth.confirmPassword': 'Confirmar Contraseña',
      'auth.phone': 'Teléfono',
      'auth.name': 'Nombre Completo',
      'auth.firstName': 'Nombre',
      'auth.lastName': 'Apellidos',
      'auth.noAccount': '¿No tienes cuenta?',
      'auth.haveAccount': '¿Ya tienes cuenta?',
      'auth.forgotPassword': '¿Olvidaste tu contraseña?',
      'auth.signIn': 'Iniciar Sesión',
      'auth.backToLogin': 'Volver al inicio de sesión',
      'auth.emailPlaceholder': 'Ingresa tu correo electrónico',
      'auth.recoveryInstructions': 'Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña',
      'auth.sendRecoveryLink': 'Enviar correo de restablecimiento',
      'auth.loginTitle': 'Iniciar Sesión',
      'auth.registerTitle': 'Registrarse',
      'auth.recoveryTitle': 'Recuperar Contraseña',

      // Error messages
      'error.email': 'Por favor, ingresa un correo electrónico válido',
      'error.password': 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo (.@$!%*#?&)',
      'error.confirmPassword': 'Las contraseñas no coinciden',
      'error.firstName': 'El nombre solo puede contener letras',
      'error.lastName': 'El apellido solo puede contener letras',
      'error.phone': 'El teléfono solo puede contener números',

      // Homepage
      'home.hero.title': 'El Mogote Doña Isabel',
      'home.hero.subtitle': 'Un paraíso natural en Oaxaca',
      'home.hero.cta': 'Explorar Cabañas',
      'home.about.title': 'Bienvenidos a El Mogote Doña Isabel',
      'home.about.text1': 'El Mogote Doña Isabel es un lugar mágico ubicado en las montañas de Oaxaca, donde podrás disfrutar de la naturaleza en su máximo esplendor.',
      'home.about.text2': 'Con vistas panorámicas a las montañas y senderos para explorar, nuestro complejo es el destino perfecto para aquellos que buscan escapar de la rutina.',
      'home.services.title': 'Nuestros Servicios',
      'home.services.subtitle': 'Lo que ofrecemos',
      'home.services.cabins.title': 'Cabañas Confortables',
      'home.services.cabins.desc': 'Disfruta de nuestras cabañas equipadas con todas las comodidades necesarias para una estancia perfecta.',
      'home.services.air.title': 'Aire Puro',
      'home.services.air.desc': 'Respira el aire más limpio de las montañas de Oaxaca, lejos de la contaminación urbana.',
      'home.services.hiking.title': 'Senderismo',
      'home.services.hiking.desc': 'Explora nuestros senderos para caminatas y descubre la belleza natural del lugar.',
      'home.services.sunset.title': 'Atardeceres Increíbles',
      'home.services.sunset.desc': 'Disfruta de impresionantes vistas panorámicas de las montañas y el valle durante el atardecer.',
      'home.services.extreme.title': 'Juegos Extremos',
      'home.services.extreme.desc': 'Vive la adrenalina en nuestro puente colgante, tirolesa y bicicletas voladoras.',
      'home.gallery.title': 'Galería',
      'home.gallery.subtitle': 'Conoce nuestras instalaciones',
      'gallery.image1.alt': 'Vista exterior de la cabaña',
      'gallery.image2.alt': 'Ambiente natural y paisaje',
      'gallery.image3.alt': 'Interior acogedor',
      'gallery.image4.alt': 'Área de descanso',
      'gallery.image5.alt': 'Vistas a la montaña',
      'gallery.image6.alt': 'Atardecer en las montañas'
    }
  },
  en: {
    translation: {
      // Navbar
      'nav.home': 'Home',
      'nav.cabins': 'Cabins',
      'nav.reserve': 'Reserve',
      'nav.login': 'Login',
      'nav.register': 'Register',
      'nav.logout': 'Logout',
      'nav.profile': 'My Profile',
      'nav.settings': 'Settings',
      'nav.myReservations': 'My Reservations',
      'comingSoon': 'Coming Soon',

      // Auth Modal
      'auth.login': 'Login',
      'auth.register': 'Register',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.phone': 'Phone',
      'auth.name': 'Full Name',
      'auth.firstName': 'First Name',
      'auth.lastName': 'Last Name',
      'auth.noAccount': "Don't have an account?",
      'auth.haveAccount': 'Already have an account?',
      'auth.forgotPassword': 'Forgot your password?',
      'auth.signIn': 'Sign In',
      'auth.backToLogin': 'Back to Login',
      'auth.emailPlaceholder': 'Enter your email',
      'auth.recoveryInstructions': 'Enter your email address and we will send you a link to reset your password',
      'auth.sendRecoveryLink': 'Send password reset email',
      'auth.loginTitle': 'Login',
      'auth.registerTitle': 'Register',
      'auth.recoveryTitle': 'Recover Password',

      // Error messages
      'error.email': 'Please enter a valid email address',
      'error.password': 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a symbol (.@$!%*#?&)',
      'error.confirmPassword': 'Passwords do not match',
      'error.firstName': 'First name can only contain letters',
      'error.lastName': 'Last name can only contain letters',
      'error.phone': 'Phone number can only contain numbers',

      // Homepage
      'home.hero.title': 'El Mogote Doña Isabel',
      'home.hero.subtitle': 'A natural paradise in Oaxaca',
      'home.hero.cta': 'Explore Cabins',
      'home.about.title': 'Welcome to El Mogote Doña Isabel',
      'home.about.text1': 'El Mogote Doña Isabel is a magical place located in the mountains of Oaxaca, where you can enjoy nature in its full splendor.',
      'home.about.text2': 'With panoramic views of the mountains and trails to explore, our complex is the perfect destination for those looking to escape routine.',
      'home.services.title': 'Our Services',
      'home.services.subtitle': 'What we offer',
      'home.services.cabins.title': 'Comfortable Cabins',
      'home.services.cabins.desc': 'Enjoy our cabins equipped with all the necessary amenities for a perfect stay.',
      'home.services.air.title': 'Fresh Air',
      'home.services.air.desc': 'Breathe the cleanest air of the Oaxaca mountains, far from urban pollution.',
      'home.services.hiking.title': 'Hiking',
      'home.services.hiking.desc': 'Explore our hiking trails and discover the natural beauty of the place.',
      'home.services.sunset.title': 'Amazing Sunsets',
      'home.services.sunset.desc': 'Enjoy impressive panoramic views of the mountains and valley during sunset.',
      'home.services.extreme.title': 'Extreme Games',
      'home.services.extreme.desc': 'Experience the adrenaline in our hanging bridge, zip line, and flying bikes.',
      'home.gallery.title': 'Gallery',
      'home.gallery.subtitle': 'See our facilities',
      'gallery.image1.alt': 'Cabin exterior view',
      'gallery.image2.alt': 'Natural environment and landscape',
      'gallery.image3.alt': 'Cozy interior',
      'gallery.image4.alt': 'Rest area',
      'gallery.image5.alt': 'Mountain views',
      'gallery.image6.alt': 'Sunset in the mountains'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // idioma por defecto
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 