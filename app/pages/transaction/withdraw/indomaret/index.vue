<template>
  <div class="p-6 max-w-md mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <h1 class="text-2xl font-bold text-gray-800">Withdraw via Indomaret</h1>
    </div>
    <Transition name="slide-fade" mode="out-in">
      <div v-if="step === 1"
        key="step1"
        class="bg-white shadow-lg rounded-3xl p-6 border border-gray-100 space-y-4" >
        <h2 class="text-gray-800 font-semibold text-lg mb-2">
          Enter Indomaret Store Code
        </h2>
        <input
          v-model="storeCode"
          type="text"
          placeholder="e.g. IDM001"
          class="w-full rounded-xl border-gray-300 focus:ring focus:ring-blue-100 focus:border-blue-500 py-2 px-3 uppercase" />
        <button
          @click="verifyStore"
          :disabled="!storeCode || loading"
          class="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 flex justify-center items-center">
          <span v-if="!loading">Next</span>
          <span v-else class="animate-pulse">Checking...</span>
        </button>
      </div>
      <!-- Step 2: Input Amount -->
      <div
        v-else-if="step === 2"
        key="step2"
        class="bg-white shadow-lg rounded-3xl p-6 border border-gray-100 space-y-4"
      >
        <h2 class="text-gray-800 font-semibold text-lg mb-2">
          Enter Withdrawal Amount
        </h2>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Amount (Rp)</label>
          <div class="relative">
            <span
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >Rp</span
            >
            <input
              v-model.number="amount"
              type="number"
              placeholder="Enter amount"
              class="w-full pl-10 rounded-xl border-gray-300 focus:ring focus:ring-blue-100 focus:border-blue-500 py-2"
            />
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="prevStep"
            class="flex-1 border border-gray-300 py-3 rounded-2xl hover:bg-gray-50 transition"
          >
            Back
          </button>
          <button
            @click="openPinModal = true"
            :disabled="!amount"
            class="flex-1 bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition disabled:bg-gray-300"
          >
            Submit
          </button>
        </div>
      </div>

      <!-- Step 3: Success -->
      <div
        v-else-if="step === 3"
        key="step3"
        class="text-center bg-white shadow-lg rounded-3xl p-6 border border-gray-100 space-y-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mx-auto text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 class="text-xl font-semibold text-green-600">
          Withdrawal Successful!
        </h2>
        <p class="text-gray-600">
          You have withdrawn Rp {{ amount?.toLocaleString() }} from store
          <span class="font-semibold">{{ storeCode }}</span>.
        </p>
        <button
          @click="reset"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Withdraw Again
        </button>
      </div>
    </Transition>

    <!-- PIN Dialog -->
    <Dialog
      v-model:visible="openPinModal"
      header="Enter Account PIN"
      modal
      class="w-full max-w-sm p-6"
    >
      <div class="space-y-4">
        <p class="text-sm text-gray-600 text-center">
          Enter your 6-digit account PIN
        </p>

        <!-- PIN display -->
        <div class="flex justify-between gap-2 mb-4">
          <div
            v-for="(n, index) in 6"
            :key="index"
            class="w-12 h-12 border rounded-xl flex items-center justify-center text-xl font-medium"
            :class="pin[index] ? 'bg-gray-200' : 'bg-white'"
          >
            {{ pin[index] ? '*' : '' }}
          </div>
        </div>

        <!-- Numeric pad -->
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="n in 9"
            :key="n"
            @click="pressNumber(n)"
            class="py-3 bg-gray-100 rounded-xl text-xl font-semibold hover:bg-gray-200 transition"
          >
            {{ n }}
          </button>
          <div></div>
          <button
            @click="pressNumber(0)"
            class="py-3 bg-gray-100 rounded-xl text-xl font-semibold hover:bg-gray-200 transition"
          >
            0
          </button>
          <button
            @click="backspace"
            class="py-3 bg-gray-100 rounded-xl text-xl font-semibold hover:bg-gray-200 transition"
          >
            ⌫
          </button>
        </div>

        <div class="flex gap-3 mt-4">
          <button
            @click="openPinModal = false"
            class="flex-1 border border-gray-300 py-3 rounded-2xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            @click="verifyPin"
            :disabled="pin.join('').length !== 6"
            class="flex-1 bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition disabled:bg-gray-300"
          >
            Confirm
          </button>
        </div>
      </div>
    </Dialog>

    <!-- Layover Alert -->
    <Transition name="pop">
      <div
        v-if="alertMessage"
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <div
          class="bg-white shadow-2xl rounded-2xl p-6 text-center border border-gray-200 max-w-xs mx-auto animate-pop"
        >
          <p
            :class="alertType === 'error' ? 'text-red-600' : 'text-green-600'"
            class="font-medium"
          >
            {{ alertMessage }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const step = ref(1);
const storeCode = ref("");
const amount = ref<number | null>(null);
const pin = ref<string[]>([]);
const openPinModal = ref(false);
const loading = ref(false);

const alertMessage = ref("");
const alertType = ref<"success" | "error">("success");

const validStores = ["IDM001", "IDM002", "IDM005", "IDM999"];

const showAlert = (message: string, type: "success" | "error" = "success") => {
  alertMessage.value = message;
  alertType.value = type;
  setTimeout(() => (alertMessage.value = ""), 1800);
};

const pressNumber = (n: number) => {
  if (pin.value.length < 6) pin.value.push(String(n));
};
const backspace = () => pin.value.pop();

const verifyStore = async () => {
  loading.value = true;
  await new Promise((r) => setTimeout(r, 700));

  if (validStores.includes(storeCode.value.toUpperCase())) {
    step.value = 2;
  } else {
    showAlert("Invalid store code. Please try again.", "error");
  }
  loading.value = false;
};

const verifyPin = async () => {
  loading.value = true;
  await new Promise((r) => setTimeout(r, 700));

  if (pin.value.join("") === "123456") {
    openPinModal.value = false;
    showAlert("Withdrawal successful!", "success");
    setTimeout(() => (step.value = 3), 800);
  } else {
    showAlert("Invalid PIN. Try again.", "error");
  }

  loading.value = false;
};

const prevStep = () => step.value--;
const reset = () => {
  step.value = 1;
  storeCode.value = "";
  amount.value = null;
  pin.value = [];
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
@keyframes pop {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-pop {
  animation: pop 0.3s ease-out;
}
</style>
