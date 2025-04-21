import { useState, useEffect } from 'react';
import { fetchUsers, register, updateUser, deleteUser } from '../services/api';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await register(userData);
      setUsers(prevUsers => [...prevUsers, newUser]);
      return newUser;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (userId, userData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await updateUser(userId, userData);
      setUsers(prevUsers => 
        prevUsers.map(user => user.user_id === userId ? updatedUser : user)
      );
      return updatedUser;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.user_id !== userId));
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    loadUsers,
    addUser,
    editUser,
    removeUser
  };
}; 