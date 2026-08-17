import { supabase } from './supabaseClient';

const userService = {
  getUserProfile: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay usuario autenticado");

      const { data, error } = await supabase
        .from('mogote_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      return { ...data, email: user.email };
    } catch (error) {
      console.error('Error al obtener perfil de usuario:', error.message);
      throw error;
    }
  },

  updateUserProfile: async (userData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay usuario autenticado");

      const { data, error } = await supabase
        .from('mogote_profiles')
        .update(userData)
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al actualizar perfil de usuario:', error.message);
      throw error;
    }
  },

  changePassword: async (passwordData) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al cambiar contraseña:', error.message);
      throw error;
    }
  }
};

export default userService;