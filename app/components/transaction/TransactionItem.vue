<template>
  <div
    class="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition"
    @click="$emit('click')"
  >
    <div>
      <p class="font-semibold text-gray-800">{{ transaction.title }}</p>
      <p class="text-sm text-gray-500">{{ transaction.date }} • {{ statusLabel }}</p>
    </div>

    <span
      :class="[
        'font-bold',
        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
      ]"
    >
      {{ transaction.type === 'credit' ? '+' : '-' }}
      Rp{{ formatAmountCurrency(transaction.amount) }}
    </span>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { formatAmountCurrency } from '@/utils/GlobalHelper'
import { TransactionStatus } from '@/types/enums/transaction'
import type { Transaction } from '~/types/models/transaction'

const props = defineProps<{ transaction: Transaction }>()

const statusLabel = computed(() => {
  const map: Record<TransactionStatus, string> = {
    [TransactionStatus.SUCCESS]: 'Success',
    [TransactionStatus.PENDING]: 'Pending',
    [TransactionStatus.FAILED]: 'Failed',
  }

  return props.transaction.status
    ? map[props.transaction.status]
    : 'Unknown'
})
</script>