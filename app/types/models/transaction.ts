import type { TransactionStatus, TransactionType } from '@/types/enums/transaction'

export interface Transaction {
  id: number
  title: string
  amount: number
  date?: string
  description?: string
  icon?: string
  type?: TransactionType   
  status?: TransactionStatus
}
