// app/utils/CountNumber.ts
import { computed, type Ref } from 'vue'
import { TransactionType } from '@/types/enums/transaction'
import type { Transaction } from '@/types/models/transaction'

export const countTransactionAmount = {
  computeTransactionSummary(transactions: Ref<Transaction[]>) {
    const creditTotal = computed(() =>
      transactions.value
        .filter(t => t.type === TransactionType.CREDIT)
        .reduce((a, b) => a + b.amount, 0)
    )

    const debitTotal = computed(() =>
      transactions.value
        .filter(t => t.type === TransactionType.DEBIT)
        .reduce((a, b) => a + b.amount, 0)
    )

    const total = computed(() => creditTotal.value + debitTotal.value)

    const percentCredit = computed(() =>
      total.value ? (creditTotal.value / total.value) * 100 : 0
    )
    const percentDebit = computed(() =>
      total.value ? (debitTotal.value / total.value) * 100 : 0
    )

    const creditDash = computed(() => `${percentCredit.value * 3.64} 999`)
    const debitDash = computed(() => `${percentDebit.value * 3.64} 999`)
    const creditOffset = computed(() => percentCredit.value * 3.64)

    return {
      creditTotal,
      debitTotal,
      total,
      percentCredit,
      percentDebit,
      creditDash,
      debitDash,
      creditOffset,
    }
  },
}
