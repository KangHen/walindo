<template>
  <div class="p-4 bg-white min-h-screen max-w-md mx-auto">
    <!-- Header -->
    <div class="flex items-center mb-4">
      <Button icon="pi pi-arrow-left" class="p-button-text mr-2" @click="router.back()" />
      <h2 class="text-lg font-semibold">Pilih Bank Tujuan</h2>
    </div>

    <!-- Search Input -->
    <div class="mb-4">
      <span class="p-input-icon-left w-full">
        <i class="pi pi-search text-gray-400" />
        <InputText
          v-model="searchQuery"
          placeholder="Cari nama bank..."
          class="w-full"
        />
      </span>
    </div>

    <!-- List Bank -->
    <div class="space-y-2">
      <div
        v-for="bank in filteredBanks"
        :key="bank.code"
        class="flex items-center justify-between border border-gray-100 rounded-xl p-3 
               hover:bg-gray-50 cursor-pointer transition-all"
        @click="selectBank(bank)"
      >
        <div class="flex items-center gap-3">
          <!-- Icon Circle -->
          <div class="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
            <i class="pi pi-building text-primary text-lg"></i>
          </div>
          <span class="text-gray-800 font-medium">{{ bank.name }}</span>
        </div>
        <i class="pi pi-angle-right text-gray-400"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

interface Bank {
  name: string
  code: string
}

const router = useRouter()
const searchQuery = ref('')

const banks: Bank[] = [
  { name: 'BCA', code: '014' },
  { name: 'Mandiri', code: '008' },
  { name: 'BNI', code: '009' },
  { name: 'BRI', code: '002' },
  { name: 'CIMB Niaga', code: '022' },
  { name: 'Permata', code: '013' },
  { name: 'BSI', code: '451' },
]

const filteredBanks = computed(() =>
  banks.filter((b) => b.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
)

const selectBank = (bank: Bank) => {
  // Simpan data atau kirim ke route selanjutnya
  router.push({ name: 'transfer-bank-detail', query: { bankCode: bank.code } })
}
</script>
