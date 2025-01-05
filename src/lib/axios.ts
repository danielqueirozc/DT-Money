import axios from 'axios'
import { Transaction } from '../@types'

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
