<template>
  <div class="bg-white rounded-2xl shadow p-4 text-center">
    <h2 class="text-sm font-semibold text-gray-500 mb-3">Summary</h2>

    <div class="flex justify-center mb-3">
      <div class="relative w-48 h-48">
        <Chart
          type="doughnut"
          :data="chartData"
          :options="chartOptions"
          class="w-full h-full"
        />
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span class="text-xs text-gray-500">Total</span>
          <span class="text-base font-semibold">
            {{ formatAmountCurrency(total) }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-6 text-xs mb-3">
      <div class="flex items-center gap-1">
        <span class="w-3 h-3 bg-green-500 rounded-full"></span> Credit
      </div>
      <div class="flex items-center gap-1">
        <span class="w-3 h-3 bg-red-500 rounded-full"></span> Debit
      </div>
    </div>

    <div class="flex justify-center gap-2">
      <Button
        v-for="range in OptionListHelper.rangeOptions()"
        :key="range.value"
        :label="range.label"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import Chart from 'primevue/chart';
import { computed } from 'vue'

const props = defineProps({
  total: { type: Number, required: true },
  credit: { type: Number, required: true },
  debit: { type: Number, required: true },
})

const chartData = computed(() => ({
  labels: ['Credit', 'Debit'],
  datasets: [
    {
      data: [props.credit, props.debit],
      backgroundColor: ['#22c55e', '#ef4444'],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
}))

const chartOptions = {
  cutout: '75%',
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const label = context.label || ''
          const value = context.raw
          return `${label}: ${value.toLocaleString()}`
        },
      },
    },
  },
}

function formatAmountCurrency(amount: number) {
  return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
}
</script>

<style scoped>
canvas {
  aspect-ratio: 1 / 1;
}
</style>
