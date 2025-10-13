// services/transaction.service.ts
import { useFetch } from '#app'
import type { TransactionResponse, TransactionListResponse } from '~/types/api/transaction'
import type { Transaction } from '~/types/models/transaction'

const config = useRuntimeConfig()

const API_URL = `${config.public.apiUrl}/transactions`

export const TransactionService = {
 async getAll(params?: Record<string, any>): Promise<TransactionListResponse> {
    const { data, error } = await useFetch<TransactionListResponse>(API_URL, {
      query: params,
    })
    if (error.value) throw new Error(error.value.message || 'Failed to fetch transactions')
    return data.value as TransactionListResponse
  },

  async getById(id: number | string): Promise<TransactionResponse> {
    const { data, error } = await useFetch<TransactionResponse>(`${API_URL}/${id}`)
    if (error.value) throw new Error(error.value.message || 'Transaction not found')
    return data.value as TransactionResponse
  },

  async create(payload: Partial<Transaction>): Promise<TransactionResponse> {
    const { data, error } = await useFetch<TransactionResponse>(`${API_URL}`, {
      method: 'POST',
      body: payload,
    })
    if (error.value) throw new Error(error.value.message || 'Failed to create transaction')
    return data.value as TransactionResponse
  },

  async update(id: number, payload: Partial<Transaction>): Promise<TransactionResponse> {
    const { data, error } = await useFetch<TransactionResponse>(`${API_URL}/${id}`, {
      method: 'PUT',
      body: payload,
    })
    if (error.value) throw new Error(error.value.message || 'Failed to update transaction')
    return data.value as TransactionResponse
  },

  async delete(id: number): Promise<void> {
    const { error } = await useFetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (error.value) throw new Error(error.value.message || 'Failed to delete transaction')
  },
}
