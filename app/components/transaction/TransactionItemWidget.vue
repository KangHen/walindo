<template>
   <div class="grid grid-cols-3 gap-4">
  <div v-for="item in items"
    :key="item.label"
    class="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center h-28 
           text-center cursor-pointer hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 
           transition-all duration-200"
    @click="item.action">
    <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-2">
      <i :class="item.icon + ' text-xl'"></i>
    </div>
    <span class="text-sm font-medium text-gray-800">{{ item.label }}</span>
  </div>
</div>

</template>

<script setup lang="ts">
import { getTransactionItems }  from '@/utils/GlobalHelper'
import type { TransactionItem } from '~/types/models/transaction'


const items: TransactionItem[] = getTransactionItems({
})
</script>
