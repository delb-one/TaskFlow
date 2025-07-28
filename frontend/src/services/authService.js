import api from './api';

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    console.log('Risposta login:', response.data); // DEBUG
    return response.data;
  } catch (error) {
    console.error('Errore login:', error.response?.data); // DEBUG
    throw error;
  }
};