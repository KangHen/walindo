<template>
  <div class="max-w-md mx-auto p-4 space-y-4">
    <Button
      label="Back"
      icon="pi pi-arrow-left"
      class="p-button-text text-sm"
      @click="$router.back()"
    />

    <Card>
      <template #title>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-700">
             {{ trx.title }}
          </h2>
          <Tag
            :value="trx.status"
            :severity="getStatusColor(trx.status)"
            rounded
          />
        </div>
      </template>

      <template #content>
        <div class="space-y-3 text-sm text-gray-700">
          <div class="flex justify-between">
            <span class="text-gray-500">Amount</span>
            <span
              :class="trx.type === 'credit' ? 'text-green-600' : 'text-red-500'"
              class="font-semibold"
            >
              {{ formatCurrency(trx.amount) }}
            </span>
          </div>

          <Divider />

          <div class="flex justify-between">
            <span class="text-gray-500">Date</span>
            <span>{{ trx.date }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-500">Type</span>
            <Tag
              :value="trx.type"
              :severity="trx.type === 'credit' ? 'success' : 'danger'"
              rounded
            />
          </div>

          <div class="flex justify-between">
            <span class="text-gray-500">Reference ID</span>
            <span class="font-mono text-gray-600">
              TRX-20251011-{{ id }}
            </span>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex gap-2 mt-3">
          <Button
            label="Download Receipt"
            icon="pi pi-download"
            severity="primary"
            class="flex-1"
          />
          <Button
            label="Repeat"
            icon="pi pi-refresh"
            severity="secondary"
            outlined
            class="flex-1"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Divider from 'primevue/divider'

const route = useRoute()
const id = route.params.id as string

const trx = {
  id,
  title: 'Payment to Tokopedia',
  date: '2025-10-10 09:33',
  amount: 150000,
  type: 'debit',
  status: 'success',
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success': return 'success'
    case 'pending': return 'warning'
    case 'failed': return 'danger'
    default: return 'info'
  }
}
</script>

<style scoped>
.p-card {
  border-radius: 16px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
}
</style>
