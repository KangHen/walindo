<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

definePageMeta({
  layout: 'auth',
})

const { login, loading, errorMessage } = useAuth();
const username = ref('')
const password = ref('')
const toast = useToast()

const onSubmit = async () => {
  if (!username.value || !password.value) {
    toast.add({
      severity: 'warn',
      summary: 'Invalid Input',
      detail: 'Username and password are required.',
      life: 3000,
    })
    return
  }

  loading.value = true
  try {
    await login(username.value, password.value)
    toast.add({
      severity: 'success',
      summary: 'Login Successful',
      detail: `Welcome to Walindo, ${username.value}!`,
      life: 3000,
    })
    navigateTo('/')
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: 'Please try again later.',
      life: 3000,
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="w-full">
    <Toast />

    <h2 class="text-xl font-semibold text-center mb-6">Welcome Back</h2>

    <form @submit.prevent="onSubmit" class="space-y-5">
      <div>
        <label for="username" class="block text-gray-600 text-sm font-medium mb-1">Username</label>
        <InputText
          id="username"
          v-model="username"
          type="text"
          placeholder="labubu"
          class="w-full"
        />
      </div>

      <div class="w-full">
        <label for="password" class="block text-gray-600 text-sm font-medium mb-1">Password</label>
        <Password
          id="password"
          v-model="password"
          :feedback="false"
          toggleMask
          class="w-full"
          inputClass="w-full"
          placeholder="••••••••"
        />
      </div>

      <Button
        type="submit"
        :label="loading ? 'Memproses...' : 'Masuk'"
        icon="pi pi-sign-in"
        class="w-full"
        :loading="loading"
      />
    </form>

    <div class="text-center mt-5 text-sm text-gray-500">
      © {{ new Date().getFullYear() }} Walindo — Wallet Indonesia
    </div>
  </div>
</template>

<style scoped>
:deep(.p-card) {
  border-radius: 1rem;
}
</style>
