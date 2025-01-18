import axios from 'axios'
import { Login, Register, Transaction } from '../@types'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export const transactionService = {
  create: async (data: Transaction) => {
    const response = await api.post('/', data)

    return response.data
  },
  list: async () => {
    const response = await api.get('/')

    return response.data
  },
}

export const loginService = {
  login: async (data: Login) => {
    const response = await api.post('/login', data);
    return response.data;
  },
  register: async (data: Register) => {
    const response = await api.post('/register', data);
    return response.data;
  },
}
