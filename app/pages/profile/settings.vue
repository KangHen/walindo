<template>
  <div class="max-w-md mx-auto p-4 space-y-6">
    <h1
      class="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2"
    >
      <i class="pi pi-cog text-green-600"></i> {{ $t("settings.title") }}
    </h1>

    <Card>
      <template #title>
        <div class="flex items-center gap-2">
          <i class="pi pi-globe text-green-600"></i>
          <span>{{ $t("settings.language") }}</span>
        </div>
      </template>
      <template #content>
        <Dropdown
          v-model="selectedLocale"
          :options="localeOptions"
          optionLabel="label"
          optionValue="code"
          class="w-full"
          @change="updateLocale"
        />
      </template>
    </Card>

    <!-- Fingerprint -->
    <Card>
      <template #title>
        <div class="flex items-center gap-2">
          <i class="pi pi-lock text-green-600"></i>
          <span>{{ $t("settings.fingerprint") }}</span>
        </div>
      </template>
      <template #content>
        <div class="flex items-center justify-between">
          <span>{{ $t("settings.enableFingerprint") }}</span>
          <InputSwitch
            v-model="fingerprintEnabled"
            @change="toggleFingerprint"
          />
        </div>
      </template>
    </Card>

    <!-- API Key -->
    <Card>
      <template #title>
        <div class="flex items-center gap-2">
          <i class="pi pi-key text-green-600"></i>
          <span>{{ $t("settings.security_code") }}</span>
        </div>
      </template>
      <template #content>
        <div class="flex items-center gap-2">
          <InputText
            :type="showKey ? 'text' : 'password'"
            v-model="apiKey"
            readonly
            class="w-full"
          />
          <Button
            icon="pi pi-eye"
            v-if="!showKey"
            text
            @click="showKey = true"
          />
          <Button icon="pi pi-eye-slash" v-else text @click="showKey = false" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputSwitch from "primevue/inputswitch";
import { useI18n } from "#imports";

const { t, locale, setLocale } = useI18n();
const layoutProps = useState("layout-props");
layoutProps.value = {
  title: "Settings",
  showBackButton: true,
};

const localeOptions = [
  { code: "id", label: "Bahasa Indonesia" },
  { code: "en", label: "English" },
];
const selectedLocale = ref(locale.value);

const updateLocale = (e: any) => {
  setLocale(e.value);
};

const fingerprintEnabled = ref(false);
const toggleFingerprint = () => {
  console.log("Fingerprint:", fingerprintEnabled.value);
};

const apiKey = ref("walindo_xxx_123456789");
const showKey = ref(false);
</script>

<style scoped>
.p-card {
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
</style>
