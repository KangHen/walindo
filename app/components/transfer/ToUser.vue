<template>
  <Transition name="slide-down">
    <div v-if="overlayMessage"
      class="fixed top-3 left-1/2 -translate-x-1/2 z-50  bg-white/95 backdrop-blur text-gray-800 rounded-xl shadow-lg  px-4 py-3 border border-gray-200 flex items-center gap-2 w-[90%] max-w-sm transition-all pointer-events-auto">
      <i class="pi pi-exclamation-circle text-yellow-500 text-lg"></i>
      <span class="text-sm font-medium">{{ overlayMessage }}</span>
    </div>
  </Transition>
  <div class="max-w-md mx-auto p-6 space-y-8 bg-white shadow-md rounded-2xl overflow-hidden">
    <div v-if="step === 1">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Send Balance</h2>
      <label class="text-sm text-gray-700 font-medium">Recipient Phone Number</label>
      <div class="border rounded-lg flex items-center px-3 py-2 mt-1 focus-within:border-primary transition">
        <InputMask
          v-model="phoneNumber"
          mask="9999-9999-9999"
          placeholder="08xx-xxxx-xxxx"
          class="w-full text-base bg-transparent border-0 focus:ring-0 focus:outline-none" />
      </div>
      <Transition name="fade">
        <div v-if="phone && !error"
          class="flex items-center gap-2 mt-3 p-3 rounded-xl bg-green-100/70 text-green-700 border border-green-300 shadow-sm" >
          <i class="pi pi-check-circle text-green-600"></i>
          <span>User found: <b>{{ phone.name }}</b></span>
        </div>
        <div v-else-if="error"
          class="flex items-center gap-2 mt-3 p-3 rounded-xl bg-red-100/70 text-red-700 border border-red-300 shadow-sm">
          <i class="pi pi-times-circle text-red-600"></i>
          <span>{{ error }}</span>
        </div>
      </Transition>
      <Button
        label="Next"
        class="p-button-primary w-full mt-5"
        @click.prevent="checkUser"
        :loading="loading"
      />
    </div>
    <div v-else-if="step === 2">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">
        Send to {{ phone?.name }}
      </h2>
      <div class="space-y-4">
        <div>
          <label class="text-sm text-gray-700 font-medium">Amount</label>
          <InputNumber
            v-model="amount"
            mode="currency"
            currency="IDR"
            locale="id-ID"
            class="w-full mt-1"
          />
        </div>
        <div>
          <label class="text-sm text-gray-700 font-medium">Note (optional)</label>
          <InputText
            v-model="note"
            placeholder="Example: Lunch payment"
            class="w-full mt-1"
          />
        </div>
      </div>
      <div class="flex gap-3 mt-6">
        <Button label="Back" class="p-button-outlined w-1/3" @click="step = 1" />
        <Button
          label="Send Now"
          class="p-button-primary w-2/3"
          :loading="loading"
          :disabled="!amount"
          @click.prevent="submit"
        />
      </div>
    </div>
    <div v-else-if="step === 3" class="text-center space-y-3">
      <i class="pi pi-check-circle text-green-500 text-5xl"></i>
      <h3 class="font-semibold text-lg text-gray-800">Transfer Successful!</h3>
      <p class="text-gray-600">
        You’ve sent <b>Rp{{ amount?.toLocaleString('id-ID') }}</b> to <b>{{ phone?.name }}</b>.
      </p>
      <Button label="Send Again" @click="resetForm" class="mt-4 w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { usePhoneCheck } from "~/composables/usePhone";
import { useTransaction } from "~/composables/useTransaction";
import { usePhoneStore } from "~/stores/phone.store";

const phoneStore = usePhoneStore();
const step = ref(1);
const phoneNumber = ref("");
const amount = ref<number | null>(null);
const note = ref("");
const overlayMessage = ref("");


const { phone, loading, error, checkPhone, clearPhone } = usePhoneCheck();
const { sendTransactionByPhone } = useTransaction();

const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

const showOverlay = (message: string, duration = 2500) => {
  overlayMessage.value = message;
  setTimeout(() => (overlayMessage.value = ""), duration);
};

const checkUser = async () => {
  const normalized = normalizePhone(phoneNumber.value);

  if (normalized.length < 10) {
    showOverlay("Please enter a valid phone number");
    return;
  }

  await checkPhone(normalized);
  if (phone.value?.name && !error.value) step.value = 2;
};

const submit = async () => {
  loading.value = true;
  if (amount.value === null || amount.value <= 0) {
  showOverlay("Please enter a valid amount");
    return;
  }
  await sendTransactionByPhone(phoneStore.phoneNumber, amount.value, note.value);
  loading.value = false;
  step.value = 3;
};

const resetForm = () => {
  step.value = 1;
  phoneNumber.value = "";
  amount.value = null;
  note.value = "";
  clearPhone();
};
</script>
<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>