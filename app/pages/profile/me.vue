<template>
  <div class="max-w-md mx-auto mt-4 space-y-5">
    <Card class="text-center">
      <template v-if="!isLoading" #content>
        <div class="flex flex-col items-center">
          <div class="relative">
            <Avatar
              :image="currentUser?.photo"
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
            {{ isEditing ? "Edit Profile" : currentUser?.name }}
          </h2>
        </div>

        <div class="mt-2 text-left space-y-3">
          <div v-if="!isEditing">
            <div class="mb-3">
              <label class="text-sm text-gray-500 block mb-1">Nama</label>
              <p class="font-medium text-gray-800">{{ currentUser?.name }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-500 block mb-1">Email</label>
              <p class="font-medium text-gray-800">{{ currentUser?.email }}</p>
            </div>
          </div>

          <div v-if="isEditing" class="space-y-3">
            <div>
              <label class="text-sm text-gray-500 block mb-1">Username</label>
              <InputText
                v-model="userForm.username"
                placeholder="Enter your username"
                class="w-full"
              />
            </div>
            <div>
              <label class="text-sm text-gray-500 block mb-1">Name</label>
              <InputText
                v-model="userForm.name"
                placeholder="Enter your name"
                class="w-full"
              />
            </div>
            <div>
              <label class="text-sm text-gray-500 block mb-1">Email</label>
              <InputText
                v-model="userForm.email"
                placeholder="Enter your email"
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
      <template v-else #content>
        <div class="w-full flex justify-center py-10">
          <Skeleton shape="circle" size="5rem" class="mb-4"></Skeleton>
        </div>
        <div class="space-y-3 flex justify-center">
          <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useState } from "#app";
import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import Skeleton from "primevue/skeleton";
import type { User } from "~/types/models/user";

const layoutProps = useState("layout-props");
layoutProps.value = {
  title: "My Profile",
  showBackButton: true,
};

const isLoading = ref(false);
const { fetchCurrentUser, currentUser, user } = useAuth();
const { updateUser } = useUser();

const isEditing = ref(false);
let userForm: Partial<User> = reactive({
  name: user.value?.name,
  email: user.value?.email,
  username: user.value?.username,
});

const toggleEdit = async () => {
  if (isEditing.value) {
    await updateUser(currentUser.value!.id, userForm);
    await updateUserForm();
  }

  isEditing.value = !isEditing.value;
};

const updateUserForm = async () => {
  isLoading.value = true;
  await fetchCurrentUser();
  isLoading.value = false;
  userForm = { ...currentUser.value };
};

onMounted(async () => {
  await updateUserForm();
});
</script>

<style scoped>
:deep(.p-card) {
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
</style>
