<template>
  <div class="p-4 max-w-md mx-auto space-y-4">
    <TransactionSummary :total="total" :credit="creditTotal" :debit="debitTotal" :creditOffset="creditOffset" />
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
    <div class="space-y-5 mt-4">
      <div v-for="(group, dateLabel) in groupedTransactions" :key="dateLabel">
     <h3 class="text-xs text-gray-400 font-semibold mb-2">{{ dateLabel }}</h3>
      <div
        v-for="trx in group"
        :key="trx.id"
        class="flex items-center justify-between bg-white rounded-xl shadow-sm px-4 py-4 mb-3 cursor-pointer hover:shadow-md transition"
        @click="navigateTo(`/transaction/${trx.id}`)">
        <div class="flex items-center gap-4">
          <span class="text-[14px] font-medium text-gray-400">{{ formatTimeLocal(trx.trx_date) }}</span>
          <div class="relative">
            <div class="w-11 h-11 flex items-center justify-center rounded-full"
              :class="typeColorLabel(trx.transaction_type).bg" >
              <i :class="typeColorLabel(trx.transaction_type).icon" class="text-base"></i>
            </div>
            <div class="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] border-2 border-white"
              :class="statusColorLabel(trx.status).bg" >
              <i :class="statusColorLabel(trx.status).icon" class="text-[7px]"></i>
            </div>
          </div>
          <div>
            <div class="text-[15px] font-semibold text-gray-800">
              {{ trx.title }}
            </div>
            <div class="text-[13px] text-gray-400">{{ trx.reference_code }}</div>
          </div>
        </div>
         <div
          v-if="wallet"
          class="text-[15px] font-semibold"
          :class="{
            'text-green-600': getWalletMutationDirection(trx, wallet.id) === 'in',
            'text-red-500': getWalletMutationDirection(trx, wallet.id) === 'out',
          }"
        >
          <span v-if="getWalletMutationDirection(trx, wallet.id) === 'in'">+</span>
          <span v-else-if="getWalletMutationDirection(trx, wallet.id) === 'out'">-</span>
          {{ formatAmountCurrency(trx.amount) }}
        </div>
        <template>
      </template>
      </div>
      </div>
    </div>
    <p v-if="filteredTransactions.length === 0" class="text-center text-gray-400 text-sm py-6">
      No transactions found.
    </p>
  </div>
</template>

<script setup lang="ts">
import TransactionSummary from '~/components/transaction/TransactionSummary.vue'
import { ref, computed } from 'vue'
import { formatAmountCurrency, statusColorLabel, OptionListHelper, formatGroupDate, typeColorLabel, formatTimeLocal, getWalletMutationDirection } from '@/utils/GlobalHelper'
import { TransactionType, TransactionStatus } from '@/types/enums/transaction'
import { countTransactionAmount } from '@/utils/CountNumber'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { useTransaction } from '~/composables/useTransaction'
import type { Transaction } from '~/types/models/transaction'

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

const { total, creditTotal, debitTotal, creditOffset } = countTransactionAmount.computeTransactionSummary(transactions)

const filteredTransactions = computed(() => {
  return transactions.value.filter(trx => {
    const matchSearch = trx.title.toLowerCase().includes(search.value.toLowerCase())
    const matchType = filterType.value ? trx.transaction_type === filterType.value : true
    const matchStatus = filterStatus.value ? trx.status === filterStatus.value : true
    return matchSearch && matchType && matchStatus
  })
})

const groupedTransactions = computed(() => {
  const groups: Record<string, Transaction[]> = {}
  filteredTransactions.value.forEach(trx => {
    const label = formatGroupDate(trx.trx_date)
    if (!groups[label]) groups[label] = []
    groups[label].push(trx)
  })
  return groups
})

function refreshList() {
  fetchTransactions()
}

// Would be change to auth user wallet
const wallet = ref({
  id: 1,
  balance: 150000,
  user_id: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
})


</script>

<style scoped>
.p-card {
  border-radius: 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}
</style>
