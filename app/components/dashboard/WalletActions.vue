<template>
  <div class="grid grid-cols-4 gap-3 mt-4">
    <div
      v-for="(item, i) in actions"
      :key="i"
      class="flex flex-col items-center justify-center p-3 bg-green-50 rounded-xl hover:bg-green-100 cursor-pointer transition"
    >
      <i :class="`pi ${item.icon} text-green-600 text-2xl`"></i>
      <span class="text-xs mt-1 text-gray-700">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const actions = [
  { label: "Top Up", icon: "pi-plus-circle" },
  { label: "Kirim", icon: "pi-send" },
  { label: "Terima", icon: "pi-download" },
  { label: "Riwayat", icon: "pi-clock" }
]
</script>
