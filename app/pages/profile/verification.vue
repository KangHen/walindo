<template>
  <div class="max-w-md mx-auto mt-4 space-y-5">
    <Card class="text-center">
      <template #title>
        <div class="flex flex-col items-center">
          <i class="pi pi-envelope text-5xl text-green-600 mb-3"></i>
          <h2 class="text-xl font-semibold text-gray-800">
            {{ $t("verification.title") }}
          </h2>
        </div>
      </template>

      <template #content>
        <p class="text-gray-600 text-center mb-5">
          {{ $t("verification.description") }}
        </p>

        <div class="flex justify-center">
          <Button
            :label="$t('verification.resendButton')"
            icon="pi pi-refresh"
            class="p-button-success w-full"
            :loading="loading"
            @click="resendEmail"
          />
        </div>

        <div v-if="message" class="mt-4 text-center">
          <p
            :class="{
              'text-green-600 font-medium': success,
              'text-red-500 font-medium': !success,
            }"
          >
            {{ message }}
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";

const layoutProps = useState("layout-props");
layoutProps.value = {
  title: "Verification",
  showBackButton: true,
};

const loading = ref(false);
const message = ref("");
const success = ref(false);

const resendEmail = async () => {};
</script>
