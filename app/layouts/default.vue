<template>
  <div class="flex flex-col min-h-screen bg-gray-50 relative">
    <NuxtLoadingIndicator />

    <!-- Header -->
    <header
      class="p-4 bg-white shadow-sm fixed top-0 left-0 right-0 z-10 flex items-center justify-between h-16"
    >
      <!-- Button Back -->
      <button
        v-if="layoutProps.showBackButton ?? false"
        class="text-green-700 hover:text-green-800 transition flex items-center gap-1"
        @click="handleBack"
      >
        <i class="pi pi-arrow-left text-lg"></i>
      </button>

      <!-- Title -->
      <h1
        :class="
          layoutProps?.showBackButton == true
            ? 'text-lg font-semibold text-green-700 text-center flex-1'
            : 'text-lg font-semibold text-green-700 mx-auto'
        "
      >
        {{ layoutProps.title || "Wallet Indonesia" }}
      </h1>
    </header>

    <main class="flex-1 pt-20 pb-24">
      <div
        class="px-4 overflow-y-auto"
        :class="
          layoutProps.showBackButton == false
            ? 'max-h-[85vh] min-h-auto'
            : 'max-h-[95vh] min-h-auto py-2'
        "
      >
        <slot />
      </div>
    </main>

    <!-- Bottom Navigation -->
    <nav
      v-if="layoutProps.showBackButton != true"
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
import { useRoute, useRouter, navigateTo, useState } from "#app";
import auth from "~/middleware/auth";

const route = useRoute();
const router = useRouter();

// layoutProps
const layoutProps = useState("layout-props", () => ({
  title: "Wallet Indonesia",
  showBackButton: false,
}));

definePageMeta({
  middleware: [auth],
});

useHead(() => ({
  title: layoutProps.value?.title || "Wallet Indonesia",
}));

const handleBack = () => {
  router.back();
};

const navItems = [
  { label: "Home", icon: "pi-home", path: "/" },
  { label: "Transaction", icon: "pi-wallet", path: "/transaction" },
  { label: "QRIS", icon: "pi-qrcode", path: "/qris" },
  { label: "Profile", icon: "pi-user", path: "/profile" },
];
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
