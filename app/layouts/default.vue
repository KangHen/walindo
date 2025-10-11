<template>
    <NuxtLoadingIndicator />
    <slot />
</template>

<script setup lang="ts">
import auth from '~/middleware/auth';

definePageMeta({
  middleware: [auth],
})
</script>