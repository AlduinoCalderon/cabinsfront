import { supabase } from './supabaseClient';

const authService = {
  // Iniciar sesión
  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { user: data.user, token: data.session?.access_token };
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      throw error;
    }
  },

  // Registrar un nuevo usuario
  register: async (userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name || userData.nombre,
          }
        }
      });
      if (error) throw error;
      return { user: data.user, token: data.session?.access_token };
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      throw error;
    }
  },

  // Cerrar sesión
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  },

  // Obtener el usuario actual
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  },

  // Obtener el token de autenticación
  getToken: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
  }
};

export default authService;