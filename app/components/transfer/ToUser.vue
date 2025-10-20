<template>
  <div class="max-w-md mx-auto p-4 space-y-6">
    <!-- Step 1: cari nomor HP -->
    <div v-if="step === 1">
      <h2 class="text-lg font-semibold mb-2">Transfer ke Pengguna</h2>
      <label class="text-sm text-gray-700 font-medium">Nomor HP Tujuan</label>
       <InputMask
      v-model="phoneNumber"
      mask="9999-9999-9999"
      placeholder="08xx-xxxx-xxxx"
      class="w-full text-base bg-transparent border-0 focus:ring-0 focus:outline-none"
    />
      <div v-if="userChecked && userFound" class="text-green-600 text-sm mt-2">
        ✅ Ditemukan: <b>{{ userName }}</b>
      </div>
      <div v-else-if="userChecked && !userFound" class="text-red-600 text-sm mt-2">
      </div>
      <Button
        label="Selanjutnya"
        class="p-button-primary w-full mt-4"
        @click.prevent="checkUser"
        :loading="loading" />
    </div>
    <div v-else-if="step === 2">
      <h2 class="text-lg font-semibold mb-2">Transfer ke {{ userName }}</h2>
      <div>
        <label class="text-sm text-gray-700 font-medium">Nominal</label>
        <InputNumber
          v-model="amount"
          mode="currency"
          currency="IDR"
          locale="id-ID"
          class="w-full mt-1"/>
      </div>
      <div>
        <label class="text-sm text-gray-700 font-medium">Catatan (opsional)</label>
        <InputText v-model="note" placeholder="Contoh: bayar makan" class="w-full mt-1" />
      </div>
      <div class="flex gap-2 mt-6">
        <Button label="Kembali" class="p-button-outlined w-1/3" @click="step = 1" />
        <Button
          label="Kirim Sekarang"
          class="p-button-primary w-2/3"
          :loading="loading"
          :disabled="!amount"
          @click.prevent="submit" />
      </div>
    </div>
    <div v-else-if="step === 3" class="text-center space-y-3">
      <i class="pi pi-check-circle text-green-500 text-4xl"></i>
      <h3 class="font-semibold text-lg">Transfer Berhasil!</h3>
      <p>Rp{{ amount?.toLocaleString('id-ID') }} ke {{ userName }}</p>
      <Button label="Transfer Lagi" @click="resetForm" class="mt-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const step = ref(1)
const phoneNumber = ref('')
const amount = ref<number | null>(null)
const note = ref('')

const userName = ref('')
const userFound = ref(false)
const userChecked = ref(false)
const loading = ref(false)

const normalizePhone = (phone: string) => phone.replace(/\D/g, '') 

const dummyUsers = [
  { phone: '081234567890', name: 'Budi Santoso' },
  { phone: '087711112222', name: 'Siti Rahma' },
  { phone: '085123456789', name: 'Andi Wijaya' },
]

// Would be change to post API
const checkUser = async () => {
  const rawPhone = phoneNumber.value

  const normalizedInput = normalizePhone(rawPhone)

  if (normalizedInput.length < 10) {
    alert('Nomor HP belum lengkap')
    return
  }

  loading.value = true
  userChecked.value = false
  userFound.value = false

  await new Promise((r) => setTimeout(r, 800))

  const found = dummyUsers.find(
    (u) => normalizePhone(u.phone) === normalizedInput
  )

  if (found) {
    userName.value = found.name
    userFound.value = true
    step.value = 2
  } else {
    userFound.value = false
  }

  userChecked.value = true
  loading.value = false
}

// POST to API
const submit = async () => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 1200))
  loading.value = false
  step.value = 3
}

const resetForm = () => {
  step.value = 1
  phoneNumber.value = ''
  amount.value = null
  note.value = ''
  userName.value = ''
  userFound.value = false
  userChecked.value = false
}
</script>
