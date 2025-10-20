<template>
  <form class="space-y-4 mt-4">
    <div>
      <label class="text-sm text-gray-700 font-medium">Nomor HP Tujuan</label>
      <InputMask
        v-model="phoneNumber"
        mask="999-9999-9999"
        placeholder="08x-xxxx-xxxx"
        class="w-full mt-1"
      />
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

    <div>
      <label class="text-sm text-gray-700 font-medium">Catatan (opsional)</label>
      <InputText v-model="note" placeholder="Contoh: bayar makan" class="w-full mt-1" />
    </div>

    <Button label="Kirim Sekarang" class="w-full mt-3" @click.prevent="submit" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const phoneNumber = ref('')
const amount = ref<number | null>(null)
const note = ref('')

const submit = () => {
  console.log({
    type: 'phone',
    phoneNumber: phoneNumber.value,
    amount: amount.value,
    note: note.value,
  })
}
</script>
