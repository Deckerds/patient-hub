import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post(
      '/api/v1/app/auth/login',
      credentials,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
