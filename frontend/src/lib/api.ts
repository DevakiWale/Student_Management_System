import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Backend NestJS API
  withCredentials: true,
});

export default api;
