<template>
  <div class="p-4 bg-white min-h-screen max-w-md mx-auto">
    <div class="flex items-center mb-4">
      <Button icon="pi pi-arrow-left" class="p-button-text mr-2" @click="router.back()" />
      <h2 class="text-lg font-semibold">Transfer ke {{ bankName }}</h2>
    </div>
    <form class="space-y-4 mt-4">
      <div>
        <label class="text-sm text-gray-700 font-medium">Nomor Rekening</label>
        <InputText v-model="accountNumber" placeholder="Masukkan nomor rekening" class="w-full mt-1" />
      </div>
      <div>
        <label class="text-sm text-gray-700 font-medium">Nominal</label>
        <InputNumber
          v-model="amount"
          mode="currency"
          currency="IDR"
          locale="id-ID"
          class="w-full mt-1"
        />
      </div>
      <Button label="Lanjutkan" class="w-full mt-3" @click.prevent="submit" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const bankCode = route.query.bankCode as string
const bankName = computed(() => {
  switch (bankCode) {
    case '014': return 'BCA'
    case '008': return 'Mandiri'
    case '009': return 'BNI'
    case '002': return 'BRI'
    default: return 'Bank Lain'
  }
})

const accountNumber = ref('')
const amount = ref<number | null>(null)

const submit = () => {
  console.log({
    bankCode,
    accountNumber: accountNumber.value,
    amount: amount.value,
  })
}
</script>
