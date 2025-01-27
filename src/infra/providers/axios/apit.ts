import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.dev.al.gapus.com.br/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
