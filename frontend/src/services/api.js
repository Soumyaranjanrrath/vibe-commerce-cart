import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com' 
  : 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const productAPI = {
  getAll: () => api.get('/api/products'),
};

export const cartAPI = {
  get: () => api.get('/api/cart'),
  add: (productId, quantity = 1) => api.post('/api/cart', { productId, quantity }),
  update: (itemId, quantity) => api.put(`/api/cart/${itemId}`, { quantity }),
  remove: (itemId) => api.delete(`/api/cart/${itemId}`),
  checkout: (cartItems, customerInfo) => api.post('/api/checkout', { cartItems, customerInfo }),
};

export const healthAPI = {
  check: () => api.get('/api/health'),
};

export default api;