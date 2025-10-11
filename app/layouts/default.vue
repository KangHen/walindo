<template>
  <div class="flex flex-col min-h-screen bg-gray-50 relative">
    <NuxtLoadingIndicator />

    <!-- Fixed Header -->
    <header
      class="p-4 bg-white shadow-sm fixed top-0 left-0 right-0 z-10 flex items-center justify-center h-16"
    >
      <slot name="header">
        <h1 class="text-lg font-semibold text-green-700">Wallet Indonesia</h1>
      </slot>
    </header>

    <!-- Main Content (scrolls with page) -->
    <main class="flex-1 pt-20 pb-24">
      <div class="max-h-[85vh] px-4 overflow-y-auto">
        <slot />
      </div>
    </main>

    <!-- Bottom Navigation -->
    <nav
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around items-center h-16 z-10"
    >
      <button
        v-for="(item, index) in navItems"
        :key="index"
        class="flex flex-col items-center text-sm text-gray-600 hover:text-green-600 transition"
        :class="{ 'text-green-600 font-semibold': route.path === item.path }"
        @click="navigateTo(item.path)"
      >
        <i :class="`pi ${item.icon} text-xl`"></i>
        <span>{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRoute, navigateTo } from '#app'
import auth from '~/middleware/auth'

definePageMeta({
  middleware: [auth],
})

const route = useRoute()

const navItems = [
  { label: 'Home', icon: 'pi-home', path: '/' },
  { label: 'Transaction', icon: 'pi-wallet', path: '/transaction' },
  { label: 'QRIS', icon: 'pi-qrcode', path: '/qris' },
  { label: 'Profile', icon: 'pi-user', path: '/profile' }
]
</script>

<style scoped>
nav {
  backdrop-filter: blur(6px);
}

@supports (padding-bottom: env(safe-area-inset-bottom)) {
  nav {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
