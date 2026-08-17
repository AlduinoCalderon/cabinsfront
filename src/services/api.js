import { supabase } from './supabaseClient';
import authService from './authService';

// Autenticación
export const login = authService.login;
export const verifyToken = authService.isAuthenticated;
export const register = authService.register;

export const requestPasswordReset = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
  return true;
};

// Usuarios (Admin)
export const fetchUsers = async () => {
  const { data, error } = await supabase.from('mogote_profiles').select('*');
  if (error) throw error;
  return data;
};

export const fetchUser = async (id) => {
  const { data, error } = await supabase.from('mogote_profiles').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const updateUser = async (userId, userData) => {
  const { data, error } = await supabase.from('mogote_profiles').update(userData).eq('id', userId).select().single();
  if (error) throw error;
  return data;
};

export const deleteUser = async (userId) => {
  const { data, error } = await supabase.from('mogote_profiles').delete().eq('id', userId).select().single();
  if (error) throw error;
  return data;
};

// Cabañas
export const fetchCabins = async () => {
  const { data, error } = await supabase.from('mogote_cabins').select('*');
  if (error) throw error;
  return data;
};

export const fetchCabin = async (id) => {
  const { data, error } = await supabase.from('mogote_cabins').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const createCabin = async (cabinData) => {
  const { data, error } = await supabase.from('mogote_cabins').insert(cabinData).select().single();
  if (error) throw error;
  return data;
};

export const updateCabin = async (cabinId, cabinData) => {
  const { data, error } = await supabase.from('mogote_cabins').update(cabinData).eq('id', cabinId).select().single();
  if (error) throw error;
  return data;
};

export const deleteCabin = async (cabinId) => {
  const { data, error } = await supabase.from('mogote_cabins').delete().eq('id', cabinId).select().single();
  if (error) throw error;
  return data;
};

// Reservas
export const fetchBookings = async () => {
  const { data, error } = await supabase.from('mogote_bookings').select('*, mogote_cabins(*)');
  if (error) throw error;
  return data;
};

export const fetchBooking = async (id) => {
  const { data, error } = await supabase.from('mogote_bookings').select('*, mogote_cabins(*)').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const fetchRecentBookings = async () => {
  const { data, error } = await supabase.from('mogote_bookings').select('*, mogote_cabins(*)').order('created_at', { ascending: false }).limit(5);
  if (error) throw error;
  return data;
};

export const createBooking = async (bookingData) => {
  const { data, error } = await supabase.from('mogote_bookings').insert(bookingData).select().single();
  if (error) throw error;
  return data;
};

export const updateBooking = async (bookingId, bookingData) => {
  const { data, error } = await supabase.from('mogote_bookings').update(bookingData).eq('id', bookingId).select().single();
  if (error) throw error;
  return data;
};

export const deleteBooking = async (bookingId) => {
  const { data, error } = await supabase.from('mogote_bookings').delete().eq('id', bookingId).select().single();
  if (error) throw error;
  return data;
};

// Pagos
export const fetchPayments = async () => {
  const { data, error } = await supabase.from('mogote_payments').select('*');
  if (error) throw error;
  return data;
};

export const createPayment = async (paymentData) => {
  const { data, error } = await supabase.from('mogote_payments').insert(paymentData).select().single();
  if (error) throw error;
  return data;
};

// Images
export const fetchImages = async () => {
  return [];
};
