import { defineStore } from 'pinia'
import type { Transaction } from '~/types/models/transaction'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as Transaction[],
    selectedTransaction: null as Transaction | null,
  }),

  actions: {
    setTransactions(data: Transaction[]) {
      this.transactions = data
    },

    setSelectedTransaction(data: Transaction) {
      this.selectedTransaction = data
    },

    clearTransactions() {
      this.transactions = []
      this.selectedTransaction = null
    },
  },
})
