<template>
  <div class="p-4 text-center bg-white rounded-2xl shadow-md mt-3">
    <div class="text-gray-500 text-sm">Available Balance</div>
    <div v-if="!loading" class="text-3xl font-bold text-green-600 mt-1">
      Rp {{ formatCurrency(balance) }}
    </div>
    <div v-if="loading" class="w-full flex justify-center">
      <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
    </div>
    <div class="text-xs text-gray-400 mt-1">Last updated {{ updatedAt }}</div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from "primevue";

const props = defineProps({
  balance: { type: Number, default: 0 },
  updatedAt: { type: String, default: "second ago" },
  loading: { type: Boolean, default: false },
});

const formatCurrency = (value: number) => {
  return value.toLocaleString("id-ID");
};
</script>
