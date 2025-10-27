// stores/phone.store.ts
import { defineStore } from "pinia";
import type { UserPhoneData } from "~/types/api/phone.response";

export const usePhoneStore = defineStore("phone", {
  state: () => ({
    phone: null as UserPhoneData | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    phoneName: (state) => state.phone?.name ?? "-",
    phoneNumber: (state) => state.phone?.phone ?? "",
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
  },

  actions: {
    setPhone(phone: UserPhoneData) {
      this.phone = phone;
    },

    setError(error: string | null) {
      this.error = error;
    },

    clearPhone() {
      this.phone = null;
      this.error = null;
    },
  },
});
