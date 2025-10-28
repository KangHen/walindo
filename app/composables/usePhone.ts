// composables/usePhoneCheck.ts
import { storeToRefs } from "pinia";
import { usePhoneStore } from "~/stores/phone.store";
import { PhoneDataService } from "~/services/phone.service";

export function usePhoneCheck() {
  const phoneStore = usePhoneStore();
  const { phone, loading, error } = storeToRefs(phoneStore);

  const checkPhone = async (phoneNumber: string) => {
    phoneStore.loading = true;
    phoneStore.error = null;

    try {
      const response = await PhoneDataService.checkPhone(phoneNumber);

      if (response.success && response.data) {
        phoneStore.setPhone(response.data);
      } else {
        phoneStore.error = response.message || "Failed to fetch number";
      }
    } catch (err: any) {
      phoneStore.error = err.message || "Failed to fetch number";
    } finally {
      phoneStore.loading = false;
    }
  };

  const clearPhone = () => {
    phoneStore.clearPhone();
  };

  return {
    phone,
    loading,
    error,
    checkPhone,
    clearPhone,
  };
}
