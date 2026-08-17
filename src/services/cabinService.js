import { supabase } from './supabaseClient';

const cabinService = {
  getAllCabins: async () => {
    try {
      const { data, error } = await supabase.from('mogote_cabins').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al obtener cabañas:', error.message);
      throw error;
    }
  },

  getCabinById: async (id) => {
    try {
      const { data, error } = await supabase.from('mogote_cabins').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error al obtener cabaña con ID ${id}:`, error.message);
      throw error;
    }
  },

  createCabin: async (cabinData) => {
    try {
      const { data, error } = await supabase.from('mogote_cabins').insert(cabinData).select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al crear cabaña:', error.message);
      throw error;
    }
  },

  updateCabin: async (id, cabinData) => {
    try {
      const { data, error } = await supabase.from('mogote_cabins').update(cabinData).eq('id', id).select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error al actualizar cabaña con ID ${id}:`, error.message);
      throw error;
    }
  },

  deleteCabin: async (id) => {
    try {
      const { data, error } = await supabase.from('mogote_cabins').delete().eq('id', id).select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error al eliminar cabaña con ID ${id}:`, error.message);
      throw error;
    }
  }
};

export default cabinService;