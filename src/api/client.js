import axios from 'axios';

const client = axios.create({
  baseURL: 'http://113.198.66.75:10093', 
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const access_token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');
  if (access_token) {
    config.headers['Authorization'] = `Bearer ${access_token}`;
  }
  if (refresh_token) {
    config.headers['Refresh'] = `Bearer ${refresh_token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default client;