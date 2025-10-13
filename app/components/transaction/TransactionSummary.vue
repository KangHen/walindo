<template>
    <div class="bg-white rounded-2xl shadow p-4 text-center">
        <h2 class="text-sm font-semibold text-gray-500 mb-3">Summary</h2>
        <div class="flex justify-center mb-3">
            <div class="relative w-32 h-32">
                <svg class="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="#e5e7eb" stroke-width="10" fill="none" />
                    <circle cx="64" cy="64" r="58" stroke="#22c55e" stroke-width="10" fill="none"
                        :stroke-dasharray="creditDash" stroke-linecap="round" />
                    <circle cx="64" cy="64" r="58" stroke="#ef4444" stroke-width="10" fill="none"
                        :stroke-dasharray="debitDash" stroke-linecap="round" :stroke-dashoffset="creditOffset" />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-xs text-gray-500">Total</span>
                    <span class="text-base font-semibold">
                        {{ formatAmountCurrency(total) }}
                    </span>
                </div>
            </div>
        </div>
        <div class="flex justify-center gap-6 text-xs mb-3">
            <div class="flex items-center gap-1">
                <span class="w-3 h-3 bg-green-500 rounded-full"></span> Credit
            </div>
            <div class="flex items-center gap-1">
                <span class="w-3 h-3 bg-red-500 rounded-full"></span> Debit
            </div>
        </div>

        <div class="flex justify-center gap-2">
            <Button v-for="range in OptionListHelper.rangeOptions()" :key="range.value" :label="range.label" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    total: { type: Number, required: true },
    creditDash: { type: String, required: true },
    debitDash: { type: String, required: true },
    creditOffset: { type: Number, required: true }
})
</script>
