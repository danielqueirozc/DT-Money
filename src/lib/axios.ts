import axios from 'axios'
import { Login, Register, Transaction } from '../@types'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const transactionService = {
  create: async (data: Transaction) => {
    const response = await api.post('/transactions', data)

    return response.data
  },
  list: async () => {
    const response = await api.get('/transactions')

    return response.data
  },
}

export const authService = {
  login: async (data: Login) => {
    const response = await api.post('/login', data);

    // save token after login
    localStorage.setItem('token', response.data.token);

    return response.data;
  },
  register: async (data: Register) => {
    const response = await api.post('/register', data);

    return response.data;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  getToken: () => {
    return localStorage.getItem('token');
  }
}


