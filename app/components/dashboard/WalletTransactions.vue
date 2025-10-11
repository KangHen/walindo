<template>
  <div class="mt-5 bg-white rounded-2xl shadow-md p-4">
    <div class="flex justify-between items-center mb-3">
      <span class="font-semibold text-gray-700">Transaksi Terakhir</span>
      <a href="#" class="text-green-600 text-sm">Lihat Semua</a>
    </div>

    <ul class="divide-y divide-gray-100">
      <li
        v-for="(tx, i) in transactions"
        :key="i"
        class="flex items-center justify-between py-2"
      >
        <div class="flex items-center gap-3">
          <i
            :class="`pi ${tx.icon} text-lg ${
              tx.amount < 0 ? 'text-red-500' : 'text-green-500'
            }`"
          ></i>
          <div>
            <div class="text-sm font-medium text-gray-800">{{ tx.title }}</div>
            <div class="text-xs text-gray-400">{{ tx.date }}</div>
          </div>
        </div>
        <div
          :class="`text-sm font-semibold ${
            tx.amount < 0 ? 'text-red-500' : 'text-green-600'
          }`"
        >
          {{ tx.amount < 0 ? '-' : '+' }}Rp {{ Math.abs(tx.amount).toLocaleString("id-ID") }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types/models/transation';

const props = defineProps({
  transactions: { type: Array as () => Transaction[], default: () => [] }
})
</script>
