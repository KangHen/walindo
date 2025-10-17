// composables/useUser.ts
import { UserService } from "~/services/user.service";
import type { User } from "~/types/models";

export const useUser = () => {
  const authStore = useAuthStore();
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);

  const createUser = async (form: Partial<User>) => {
    loading.value = true;
    errorMessage.value = null;

    try {
      const response = await UserService.create(form);

      if (response?.success) {
        authStore.setUser(response.data);
      } else {
        throw new Error("Error creating user");
      }
    } catch (err: any) {
      errorMessage.value = err.message || "Login failed";
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (id: number, form: Partial<User>) => {
    loading.value = true;
    errorMessage.value = null;

    try {
      const response = await UserService.update(id, form);

      if (response?.success) {
        authStore.setUser(response.data);
      } else {
        throw new Error("Error updating user");
      }
    } catch (err: any) {
      errorMessage.value = err.message || "Login failed";
    } finally {
      loading.value = false;
    }
  };

  const deleteUser = async (id: number) => {
    loading.value = true;
    errorMessage.value = null;

    try {
      const response = await UserService.delete(id);

      if (response?.success) {
        authStore.clearAuth();
        navigateTo("/login");
      } else {
        throw new Error("Error deleting user");
      }
    } catch (err: any) {
      errorMessage.value = err.message || "Login failed";
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    errorMessage,
    createUser,
    updateUser,
    deleteUser,
  };
};
