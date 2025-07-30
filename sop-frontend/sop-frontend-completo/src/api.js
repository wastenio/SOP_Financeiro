// src/api.js
import axios from 'axios';

// Cria a instância axios com baseURL e headers padrão
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token Bearer nas requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento global de respostas
api.interceptors.response.use(
  response => response, // Retorna resposta normalmente
  error => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Token inválido ou expirado: limpar token e redirecionar para login
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redireciona forçado para login
      }
    }
    return Promise.reject(error);
  }
);

// Funções auxiliares para chamadas HTTP (opcional)
const get = (url, config) => api.get(url, config);
const post = (url, data, config) => api.post(url, data, config);
const put = (url, data, config) => api.put(url, data, config);
const del = (url, config) => api.delete(url, config);

export default {
  ...api,
  get,
  post,
  put,
  delete: del,
};
