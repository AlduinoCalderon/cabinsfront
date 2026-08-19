import { supabase } from './supabaseClient';

const bookingService = {
  getUserBookings: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay usuario autenticado");

      const { data, error } = await supabase
        .from('mogote_bookings')
        .select(`*, mogote_cabins (*)`)
        .eq('user_id', user.id)
        .order('start_date', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al obtener reservas del usuario:', error.message);
      throw error;
    }
  },

  getAllBookings: async () => {
    try {
      const { data, error } = await supabase
        .from('mogote_bookings')
        .select(`
          *,
          mogote_cabins (*),
          mogote_profiles:user_id (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al obtener todas las reservas:', error.message);
      throw error;
    }
  },

  updateBookingStatus: async (id, status) => {
    try {
      const { data, error } = await supabase
        .from('mogote_bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error al actualizar estado de la reserva ${id}:`, error.message);
      throw error;
    }
  },

  getBookingById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('mogote_bookings')
        .select(`*, mogote_cabins (*)`)
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error al obtener reserva con ID ${id}:`, error.message);
      throw error;
    }
  },

  createBooking: async (bookingData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay usuario autenticado");

      const dataToInsert = { ...bookingData, user_id: user.id };
      
      const { data, error } = await supabase
        .from('mogote_bookings')
        .insert(dataToInsert)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al crear reserva:', error.message);
      throw error;
    }
  },

  updateBooking: async (id, bookingData) => {
    try {
      const { data, error } = await supabase
        .from('mogote_bookings')
        .update(bookingData)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error al actualizar reserva con ID ${id}:`, error.message);
      throw error;
    }
  },

  cancelBooking: async (id) => {
    try {
      const { data, error } = await supabase
        .from('mogote_bookings')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error al cancelar reserva con ID ${id}:`, error.message);
      throw error;
    }
  }
};

export default bookingService;