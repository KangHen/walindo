<template>
  <section class="bg-white rounded-2xl shadow-md divide-y divide-gray-100">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition"
      @click="navigateTo(item.path)"
    >
      <div class="flex items-center gap-3">
        <i :class="`pi ${item.icon} text-green-600 text-lg`"></i>
        <span class="text-gray-800 font-medium">{{ item.label }}</span>
      </div>
      <i class="pi pi-angle-right text-gray-400"></i>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  items: {
    type: Array<{ label: string; icon: string; path: string }>,
    default: () => []
  }
})
</script>
