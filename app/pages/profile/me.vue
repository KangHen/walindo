<template>
  <div class="max-w-md mx-auto mt-4 space-y-5">
    <!-- Profile Info Section -->
    <Card class="text-center">
      <template #content>
        <div class="flex flex-col items-center">
          <div class="relative">
            <Avatar
              :image="user.photo"
              shape="circle"
              size="xlarge"
              class="border-4 border-green-500 shadow-sm"
            />
            <Button
              icon="pi pi-camera"
              size="small"
              rounded
              severity="success"
              class="absolute bottom-0 right-6"
            />
          </div>

          <h2 class="mt-3 text-lg font-semibold text-gray-800">
            {{ isEditing ? 'Edit Profile' : user.name }}
          </h2>
        </div>

        <div class="mt-2 text-left space-y-3">
          <div v-if="!isEditing">
            <div class="mb-3">
              <label class="text-sm text-gray-500 block mb-1">Nama</label>
              <p class="font-medium text-gray-800">{{ user.name }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-500 block mb-1">Email</label>
              <p class="font-medium text-gray-800">{{ user.email }}</p>
            </div>
          </div>

          <div v-if="isEditing" class="space-y-3">
            <div>
              <label class="text-sm text-gray-500 block mb-1">Nama</label>
              <InputText
                v-model="editUser.name"
                placeholder="Masukkan nama"
                class="w-full"
              />
            </div>
            <div>
              <label class="text-sm text-gray-500 block mb-1">Email</label>
              <InputText
                v-model="editUser.email"
                placeholder="Masukkan email"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <div class="mt-4">
          <Button
            :label="isEditing ? 'Update' : 'Update Information'"
            :icon="isEditing ? 'pi pi-check' : 'pi pi-user-edit'"
            class="w-full"
            severity="success"
            @click="toggleEdit"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useState } from '#app'
import { ref, reactive } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'
import Divider from 'primevue/divider'

const layoutProps = useState('layout-props')
layoutProps.value = {
  title: 'My Profile',
  showBackButton: true
}

// 🧑 Data user (mock)
const user = reactive({
  name: 'Hendri Argadiyanto',
  email: 'hendri@example.com',
  photo: 'https://i.pravatar.cc/150?img=12',
})

const isEditing = ref(false)
const editUser = reactive({
  name: user.name,
  email: user.email,
})

const toggleEdit = () => {
  if (!isEditing.value) {
    isEditing.value = true
    editUser.name = user.name
    editUser.email = user.email
  } else {
    user.name = editUser.name
    user.email = editUser.email
    isEditing.value = false
  }
}
</script>

<style scoped>
:deep(.p-card) {
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
</style>
