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
      Rp{{ formatAmount(transaction.amount) }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})

const statusMap = {
  success: '✅ Success',
  pending: '⏳ Pending',
  failed: '❌ Failed',
}

const statusLabel = computed(() => statusMap[props.transaction.status] || props.transaction.status)

function formatAmount(value) {
  return new Intl.NumberFormat('id-ID').format(value)
}
</script>
