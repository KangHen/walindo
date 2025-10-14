// stores/useTransactionStore.ts
import { defineStore } from 'pinia'
import { TransactionType } from '@/types/enums/transaction'
import type { Transaction } from '~/types/models/transaction'

export const useTransactionStore = defineStore("transaction", {
  state: () => ({
    transactions: [] as Transaction[],
    selectedTransaction: null as Transaction | null,
  }),

  getters: {

    creditTotal: (state) =>
      state.transactions
        .filter((t) => t.transaction_type === TransactionType.CREDIT)
        .reduce((a, b) => a + b.amount, 0),

    debitTotal: (state) =>
      state.transactions
        .filter((t) => t.transaction_type === TransactionType.DEBIT)
        .reduce((a, b) => a + b.amount, 0),

    total(): number {
      return this.creditTotal + this.debitTotal
    },
    percentCredit(): number {
      return this.total ? (this.creditTotal / this.total) * 100 : 0
    },
    percentDebit(): number {
      return this.total ? (this.debitTotal / this.total) * 100 : 0
    },
    creditDash(): string {
      return `${this.percentCredit * 3.64} 999`
    },
    debitDash(): string {
      return `${this.percentDebit * 3.64} 999`
    },
    creditOffset(): number {
      return this.percentCredit * 3.64
    },
  },

  actions: {
    setTransactions(data: Transaction[]) {
      this.transactions = data
    },

    setSelectedTransaction(data: Transaction | null) {
      this.selectedTransaction = data
    },

    clearTransactions() {
      this.transactions = []
      this.selectedTransaction = null
    },
  },
})
