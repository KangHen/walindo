// types/api/transaction.ts
import type { Transaction } from '~/types/models/transaction'

export interface TransactionResponse {
  data: Transaction
  message?: string
}

export interface TransactionListResponse {
  data: Transaction[]
  message?: string
}
