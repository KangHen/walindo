<template>
  <div class="p-4 text-center bg-white rounded-2xl shadow-md mt-3">
    <div class="text-gray-500 text-sm">Available Balance</div>
    <div class="text-3xl font-bold text-green-600 mt-1">Rp {{ formatCurrency(balance) }}</div>
    <div class="text-xs text-gray-400 mt-1">Last updated {{ updatedAt }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  balance: { type: Number, required: true },
  updatedAt: { type: String, default: "second ago" }
})

const formatCurrency = (value: number) => value.toLocaleString("id-ID")
</script>
