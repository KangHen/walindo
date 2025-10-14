import type { TransactionStatus, TransactionType } from '@/types/enums/transaction'
import type { Mutation } from './mutation';     
// export interface Transaction {
//   id: number
//   title: string
//   amount: number
//   date?: string
//   description?: string
//   icon?: string
//   type?: TransactionType   
//   status?: TransactionStatus
// }

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  trx_date: string;
  transaction_type: TransactionType; 
  status: TransactionStatus; 
  reference_code: string;
  icon: string;
  created_at: string;
  updated_at: string;
  mutations: Mutation[];
}