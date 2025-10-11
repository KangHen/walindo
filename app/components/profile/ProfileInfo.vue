<template>
  <section class="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
    <div class="relative">
      <img
        :src="user.avatarUrl"
        alt="User Photo"
        class="w-20 h-20 rounded-full object-cover border-4 border-green-500 shadow-sm"
      />
      <button
        class="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1 w-8 h-8 hover:bg-green-600 transition"
      >
        <i class="pi pi-camera text-xs"></i>
      </button>
    </div>

    <h2 class="mt-3 text-lg font-semibold text-gray-800">{{ user.name }}</h2>
    <p class="text-sm text-gray-500">{{ user.email }}</p>
  </section>
</template>

<script setup lang="ts">
import type { User } from '~/types/models/user';

defineProps({
  user: { type: Object as () => User, required: true }
})
</script>
