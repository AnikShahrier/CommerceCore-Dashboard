import axios from 'axios';

// Base URL points to our backend
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getStats = () => API.get('/stats/summary');
export const getSalesChart = () => API.get('/stats/sales-chart');