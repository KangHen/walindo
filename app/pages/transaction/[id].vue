<template>
  <div class="max-w-md mx-auto p-4 space-y-4">
    <Card>
      <template #title>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-700">
             {{ trx.title }}
          </h2>
          <Tag
            :value="trx.status"
            :severity="statusColorLabel(trx.status)"
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
              {{ formatAmountCurrency(trx.amount) }}
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
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Divider from 'primevue/divider'
import { useRoute } from 'vue-router'
import { formatAmountCurrency, statusColorLabel } from '@/utils/GlobalHelper'
import { TransactionType, TransactionStatus } from '@/types/enums/transaction'
import type { Transaction } from '~/types/models/transaction'

const layoutProps = useState('layout-props')
layoutProps.value = {
  title: 'Transaction Details',
  showBackButton: true,
}

const route = useRoute()
const id = route.params.id as string

const trx: Transaction = {
  id: Number(id),
  title: 'Payment to Tokopedia',
  date: '2025-10-10 09:33',
  amount: 150000,
  type: TransactionType.DEBIT,
  status: TransactionStatus.SUCCESS,
}

</script>

<style scoped>
.p-card {
  border-radius: 16px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
}
</style>

<style scoped>
.p-card {
  border-radius: 16px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
}
</style>
