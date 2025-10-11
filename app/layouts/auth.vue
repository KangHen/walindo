<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <Card class="shadow-lg w-[380px]">
      <template #content>
        <slot />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
</script>

<style scoped>
.text-primary {
  color: #007ad9;
}
</style>
