<template>
  <div class="p-6 max-w-md mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="p-2 rounded-full hover:bg-gray-100 transition">
        <Icon name="i-heroicons-arrow-left" class="w-5 h-5 text-gray-700" />
      </button>
      <h1 class="text-2xl font-bold text-gray-800">Withdraw to Bank</h1>
    </div>
    <Toast ref="toast" />
    <div v-if="step === 1" class="bg-white shadow-lg rounded-3xl p-6 border border-gray-100 space-y-4">
      <h2 class="text-gray-800 font-semibold text-lg mb-2">Select Bank</h2>
      <Dropdown v-model="bankName"
        :options="banks"
        placeholder="Select a bank"
        class="w-full"
      />
      <button
        @click="nextStep"
        :disabled="!bankName"
        class="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-300" >
        Next
      </button>
    </div>
    <div v-if="step === 2" class="bg-white shadow-lg rounded-3xl p-6 border border-gray-100 space-y-4">
      <h2 class="text-gray-800 font-semibold text-lg mb-2">Enter Withdrawal Details</h2>
      <div>
        <label class="block text-sm text-gray-600 mb-1">Account Number</label>
        <input v-model="accountNumber"
          type="text"
          placeholder="Enter account number"
          class="w-full rounded-xl border-gray-300 focus:ring focus:ring-blue-100 focus:border-blue-500 py-2 px-3"
        />
      </div>
      <div class="relative">
        <label class="block text-sm text-gray-600 mb-1">Amount (Rp)</label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
          <input v-model.number="amount"
            type="number"
            placeholder="Enter amount"
            class="w-full pl-10 rounded-xl border-gray-300 focus:ring focus:ring-blue-100 focus:border-blue-500 py-2"
          />
        </div>
      </div>
      <div class="flex gap-3">
        <button @click="step = 1" class="flex-1 border border-gray-300 py-3 rounded-2xl hover:bg-gray-50 transition">
          Back
        </button>
        <button @click="openPinModal = true"
          :disabled="!accountNumber || !amount"
          class="flex-1 bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition disabled:bg-gray-300">
          Submit
        </button>
      </div>
    </div>
    <Dialog v-model:visible="openPinModal" header="Enter Account PIN" modal class="w-full max-w-sm p-6">
      <div class="space-y-4">
        <p class="text-sm text-gray-600">Enter your 6-digit account PIN</p>
        <div class="flex justify-between gap-2 mb-4">
          <div v-for="(n, index) in 6" :key="index" class="w-12 h-12 border rounded-xl flex items-center justify-center text-xl font-medium"
            :class="pin[index] ? 'bg-gray-200' : 'bg-white'" >
            {{ pin[index] ? '*' : '' }}
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <button v-for="n in 9" :key="n" @click="pressNumber(n)" class="py-3 bg-gray-100 rounded-xl text-xl font-semibold hover:bg-gray-200 transition">
            {{ n }}
          </button>
          <div></div>
          <button @click="pressNumber(0)" class="py-3 bg-gray-100 rounded-xl text-xl font-semibold hover:bg-gray-200 transition">0</button>
          <button @click="backspace" class="py-3 bg-gray-100 rounded-xl text-xl font-semibold hover:bg-gray-200 transition">⌫</button>
        </div>
        <div class="flex gap-3 mt-4">
          <button @click="openPinModal = false" class="flex-1 border border-gray-300 py-3 rounded-2xl hover:bg-gray-50 transition">
            Cancel
          </button>
          <button @click="submitWithdraw" :disabled="pin.join('').length !== 6" class="flex-1 bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition disabled:bg-gray-300">
            Confirm
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '#app'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog'

const step = ref(1)
const bankName = ref('')
const accountNumber = ref('')
const amount = ref<number | null>(null)
const loading = ref(false)
const pin = ref(Array(6).fill(''))
const openPinModal = ref(false)

const banks = [
  'BCA','BNI','BRI','Mandiri','CIMB Niaga','Permata','Danamon','BSI','Bank Mega'
]

const toast = useToast()

const nextStep = () => {
  if (bankName.value) step.value = 2
}

// Virtual Keypad Functions
const pressNumber = (num: number) => {
  const firstEmpty = pin.value.findIndex(p => p === '')
  if (firstEmpty !== -1) pin.value[firstEmpty] = num.toString()
}

const backspace = () => {
  const lastFilled = [...pin.value].reverse().findIndex(p => p !== '')
  if (lastFilled !== -1) pin.value[5 - lastFilled] = ''
}

// Submit Withdraw
const submitWithdraw = async () => {
  if (!bankName.value || !accountNumber.value || !amount.value || pin.value.join('').length !== 6) {
    toast.add({ severity: 'warn', summary: 'Failed', detail: 'Please fill all fields.', life: 3000 })
    return
  }

  loading.value = true
  try {
    const { error } = await useFetch('/api/wallet/withdraw', {
      method: 'POST',
      body: {
        bank_name: bankName.value,
        account_number: accountNumber.value,
        amount: amount.value,
        pin: pin.value.join('')
      }
    })

    if (error.value) throw error.value

    toast.add({ severity: 'success', summary: 'Success', detail: 'Withdrawal is being processed.', life: 3000 })
    step.value = 1
    bankName.value = ''
    accountNumber.value = ''
    amount.value = null
    pin.value = Array(6).fill('')
    openPinModal.value = false
  } catch (err: any) {
    toast.add({ severity: 'error', summary: 'Failed', detail: err.message || 'Something went wrong.', life: 3000 })
  } finally {
    loading.value = false
  }
}
</script>
