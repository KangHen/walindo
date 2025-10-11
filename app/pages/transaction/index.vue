<template>
  <div class="p-4 max-w-md mx-auto space-y-4">
    <!-- 💰 Summary -->
    <div class="bg-white rounded-2xl shadow p-4 text-center">
      <h2 class="text-sm font-semibold text-gray-500 mb-3">Summary</h2>

      <!-- Ring Summary -->
      <div class="flex justify-center mb-3">
        <div class="relative w-32 h-32">
          <svg class="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="#e5e7eb"
              stroke-width="10"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="#22c55e"
              stroke-width="10"
              fill="none"
              :stroke-dasharray="creditDash"
              stroke-linecap="round"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="#ef4444"
              stroke-width="10"
              fill="none"
              :stroke-dasharray="debitDash"
              stroke-linecap="round"
              :stroke-dashoffset="creditOffset"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-xs text-gray-500">Total</span>
            <span class="text-base font-semibold">
              {{ formatCurrency(total) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="flex justify-center gap-6 text-xs mb-3">
        <div class="flex items-center gap-1">
          <span class="w-3 h-3 bg-green-500 rounded-full"></span> Credit
        </div>
        <div class="flex items-center gap-1">
          <span class="w-3 h-3 bg-red-500 rounded-full"></span> Debit
        </div>
      </div>

      <!-- Range Buttons -->
      <div class="flex justify-center gap-2">
        <Button
          v-for="range in ranges"
          :key="range.value"
          :label="range.label"
          :outlined="selectedRange !== range.value"
          :severity="selectedRange === range.value ? 'info' : undefined"
          size="small"
          @click="setRange(range.value)"
        />
      </div>
    </div>
    <div class="flex items-center justify-between mt-4 mb-2">
      <h1 class="text-base font-semibold flex items-center gap-2">
        Transaction List
      </h1>
      <Button
        icon="pi pi-refresh"
        class="p-button-rounded p-button-text"
        @click="refreshList"
        tooltip="Refresh"
        tooltipOptions="{ position: 'bottom' }"
      />
    </div>
    <div class="space-y-2">
      <span class="p-input-icon-left w-full">
        <i class="pi pi-search" />
        <InputText v-model="search" placeholder="Search..." class="w-full" />
      </span>
      <div class="flex gap-2">
        <Dropdown
          v-model="filterType"
          :options="typeOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Type"
          class="flex-1"
        />
        <Dropdown
          v-model="filterStatus"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Status"
          class="flex-1"
        />
      </div>
    </div>
    <div class="space-y-3">
      <Card
        v-for="trx in filteredTransactions"
        :key="trx.id"
        class="cursor-pointer border border-gray-100 hover:border-gray-300 transition-all"
        @click="goToDetail(trx.id)"
      >
        <template #title>
          <div class="flex justify-between items-center">
            <span class="font-semibold text-gray-700">{{ trx.title }}</span>
            <Tag
              :value="trx.type"
              :severity="trx.type === 'credit' ? 'success' : 'danger'"
              rounded
            />
          </div>
        </template>

        <template #content>
          <div class="flex justify-between items-center text-sm">
            <div class="text-gray-500">{{ trx.date }}</div>
            <div
              :class="trx.type === 'credit' ? 'text-green-600' : 'text-red-500'"
              class="font-semibold"
            >
              {{ formatCurrency(trx.amount) }}
            </div>
          </div>
        </template>

        <template #footer>
          <div class="flex justify-between items-center">
            <Tag
              :value="trx.status"
              :severity="getStatusColor(trx.status)"
              rounded
            />
            <Button
              icon="pi pi-eye"
              class="p-button-text p-button-sm"
              @click.stop="goToDetail(trx.id)"
            />
          </div>
        </template>
      </Card>
    </div>
    <p
      v-if="filteredTransactions.length === 0"
      class="text-center text-gray-400 text-sm py-6"
    >
      No transactions found.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Tag from 'primevue/tag'
import Card from 'primevue/card'

const router = useRouter()

// Filters
const search = ref('')
const filterType = ref('')
const filterStatus = ref('')

// Options
const typeOptions = [
  { label: 'All', value: '' },
  { label: 'Credit', value: 'credit' },
  { label: 'Debit', value: 'debit' },
]

const statusOptions = [
  { label: 'All', value: '' },
  { label: 'Success', value: 'success' },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
]

const ranges = [
  { label: '1 Bulan', value: '1m' },
  { label: '3 Bulan', value: '3m' },
  { label: '12 Bulan', value: '12m' },
]
const selectedRange = ref('1m')

// Dummy data
const transactions = ref([
  { id: 1, title: 'Top Up BCA VA', date: '2025-10-11', amount: 250000, type: 'credit', status: 'success' },
  { id: 2, title: 'Payment to Tokopedia', date: '2025-10-10', amount: 150000, type: 'debit', status: 'success' },
  { id: 3, title: 'Transfer to @andi_wallet', date: '2025-10-09', amount: 50000, type: 'debit', status: 'pending' },
  { id: 4, title: 'Refund from Marketplace', date: '2025-10-08', amount: 20000, type: 'credit', status: 'failed' },
])

// Summary
const creditTotal = computed(() =>
  transactions.value.filter(t => t.type === 'credit').reduce((a, b) => a + b.amount, 0)
)
const debitTotal = computed(() =>
  transactions.value.filter(t => t.type === 'debit').reduce((a, b) => a + b.amount, 0)
)
const total = computed(() => creditTotal.value + debitTotal.value)

const percentCredit = computed(() =>
  total.value ? (creditTotal.value / total.value) * 100 : 0
)
const percentDebit = computed(() =>
  total.value ? (debitTotal.value / total.value) * 100 : 0
)

// SVG ring setup
const creditDash = computed(() => `${percentCredit.value * 3.64} 999`)
const debitDash = computed(() => `${percentDebit.value * 3.64} 999`)
const creditOffset = computed(() => percentCredit.value * 3.64)

function setRange(range: string) {
  selectedRange.value = range
}

const filteredTransactions = computed(() => {
  return transactions.value.filter((trx) => {
    const matchSearch = trx.title.toLowerCase().includes(search.value.toLowerCase())
    const matchType = filterType.value ? trx.type === filterType.value : true
    const matchStatus = filterStatus.value ? trx.status === filterStatus.value : true
    return matchSearch && matchType && matchStatus
  })
})

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

function refreshList() {
  console.log('🔄 Refresh clicked (replace with API call)')
}

function goToDetail(id: number) {
  router.push(`/transaction/${id}`)
}
</script>

<style scoped>
.p-card {
  border-radius: 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}
</style>
