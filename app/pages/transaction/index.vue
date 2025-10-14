<template>
  <div class="p-4 max-w-md mx-auto space-y-4">
    <TransactionSummary :total="total" :creditDash="creditDash" :debitDash="debitDash" :creditOffset="creditOffset" />

    <div class="flex items-center justify-between mt-4 mb-2">
      <h1 class="text-base font-semibold flex items-center gap-2">
        Transaction List
      </h1>
      <Button icon="pi pi-refresh" class="p-button-rounded p-button-text" @click="refreshList" tooltip="Refresh"
        tooltipOptions="{ position: 'bottom' }" />
    </div>

    <div class="space-y-2">
      <span class="p-input-icon-left w-full">
        <i class="pi pi-search" />
        <InputText v-model="search" placeholder="Search..." class="w-full" />
      </span>
      <div class="flex gap-2">
        <Dropdown v-model="filterType" :options="OptionListHelper.typeOptions()" optionLabel="label" optionValue="value"
          placeholder="Type" class="flex-1" />
        <Dropdown v-model="filterStatus" :options="OptionListHelper.statusOptions()" optionLabel="label"
          optionValue="value" placeholder="Status" class="flex-1" />
      </div>
    </div>

    <div class="space-y-3">
      <Card v-for="trx in filteredTransactions" :key="trx.id"
        class="cursor-pointer border border-gray-100 hover:border-gray-300 transition-all"
        @click="navigateTo(`/transaction/${trx.id}`)">
        <template #title>
          <div class="flex justify-between items-center">
            <span class="font-semibold text-gray-700">{{ trx.title }}</span>
            <Tag :value="trx.transaction_type" :severity="trx.transaction_type === TransactionType.CREDIT ? 'success' : 'danger'" rounded />
          </div>
        </template>
        <template #content>
          <div class="flex justify-between items-center text-sm">
            <div class="text-gray-500">{{ trx.trx_date }}</div>
            <div :class="trx.transaction_type === TransactionType.CREDIT ? 'text-green-600' : 'text-red-500'" class="font-semibold">
              {{ formatAmountCurrency(trx.amount) }}
            </div>
          </div>
        </template>

        <template #footer>
          <div class="flex justify-between items-center">
            <Tag :value="trx.status" :severity="statusColorLabel(trx.status)" rounded />
            <Button icon="pi pi-eye" class="p-button-text p-button-sm"
              @click.stop="navigateTo(`/transaction/${trx.id}`)" />
          </div>
        </template>
      </Card>
    </div>

    <p v-if="filteredTransactions.length === 0" class="text-center text-gray-400 text-sm py-6">
      No transactions found.
    </p>
  </div>
</template>

<script setup lang="ts">
import TransactionSummary from '~/components/transaction/TransactionSummary.vue'
import { ref, computed } from 'vue'
import { formatAmountCurrency, statusColorLabel, OptionListHelper } from '@/utils/GlobalHelper'
import { TransactionType, TransactionStatus } from '@/types/enums/transaction'
import { countTransactionAmount } from '@/utils/CountNumber'
import type { Transaction } from '~/types/models/transaction'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Tag from 'primevue/tag'
import Card from 'primevue/card'
import { useTransaction } from '~/composables/useTransaction'

const layoutProps = useState('layout-props')
layoutProps.value = {
  title: 'Transaction',
}

const { transactions, loading, fetchTransactions } = useTransaction()

const search = ref('')
const filterType = ref<TransactionType | ''>('')
const filterStatus = ref<TransactionStatus | ''>('')

onMounted(() => {
  fetchTransactions()
})

const { total, creditDash, debitDash, creditOffset } = countTransactionAmount.computeTransactionSummary(transactions)

const filteredTransactions = computed(() => {
  return transactions.value.filter(trx => {
    const matchSearch = trx.title.toLowerCase().includes(search.value.toLowerCase())
    const matchType = filterType.value ? trx.transaction_type === filterType.value : true
    const matchStatus = filterStatus.value ? trx.status === filterStatus.value : true
    return matchSearch && matchType && matchStatus
  })
})

function refreshList() {
  fetchTransactions()
}

</script>

<style scoped>
.p-card {
  border-radius: 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}
</style>
