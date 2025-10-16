<template>
  <div class="mt-5 bg-white rounded-2xl shadow-md p-4">
    <div class="flex justify-between items-center mb-3">
      <span class="font-semibold text-gray-700">Latest Transactions</span>
      <a href="#" class="text-green-600 text-sm">View All</a>
    </div>

    <ul class="divide-y divide-gray-100">
      <li
        v-for="(trx, i) in transactions"
        :key="i"
        class="flex items-center justify-between py-2"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-11 h-11 flex items-center justify-center rounded-full"
            :class="typeColorLabel(trx.transaction_type).bg"
          >
            <i
              :class="typeColorLabel(trx.transaction_type).icon"
              class="text-base"
            ></i>
          </div>
          <div>
            <div class="text-sm font-medium text-gray-800">{{ trx.title }}</div>
            <div class="text-xs text-gray-400">
              {{ formatDateLocal(trx.trx_date) }}
            </div>
          </div>
        </div>
        <div
          class="text-[15px] font-semibold"
          :class="{
            'text-green-600': getWalletMutationDirection(trx) === 'in',
            'text-red-500': getWalletMutationDirection(trx) === 'out',
          }"
        >
          <span v-if="getWalletMutationDirection(trx) === 'in'">+</span>
          <span v-else-if="getWalletMutationDirection(trx) === 'out'">-</span>
          {{ formatAmountCurrency(trx.amount) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  typeColorLabel,
  getWalletMutationDirection,
  formatAmountCurrency,
  formatDateLocal,
} from "#imports";
import type { Transaction } from "~/types/models";

const props = defineProps({
  transactions: { type: Array as () => Transaction[], default: () => [] },
});
</script>
