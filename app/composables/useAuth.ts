// composables/useAuth.ts
import { AuthService } from "~/services/auth.service";
import type { User } from "~/types/models";

export const useAuth = () => {
  const authStore = useAuthStore();
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);
  const currentUser = ref<User | null>(null);

  const login = async (email: string, password: string) => {
    loading.value = true;
    errorMessage.value = null;

    try {
      const response = await AuthService.login(email, password);

      if (response?.success && response?.data?.token) {
        authStore.setAuth(
          response.data.token,
          response.data.user ?? response.data
        );

        navigateTo("/");
      } else {
        throw new Error("User or password is incorrect");
      }
    } catch (err: any) {
      errorMessage.value = err.message || "Login failed";
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (_) {}
    authStore.clearAuth();

    navigateTo("/login");
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await AuthService.me();

      if (response?.success && response?.data) {
        currentUser.value = response.data;
      } else {
        throw new Error("Error fetching user data");
      }
    } catch (err: any) {
      errorMessage.value = err.message || "Fetching user data failed";
    }
  };

  const initAuth = () => {
    authStore.loadAuthFromStorage();
  };

  return {
    user: computed(() => {
      initAuth();
      return authStore.user;
    }),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    currentUser,
    loading,
    errorMessage,
    login,
    logout,
    initAuth,
    fetchCurrentUser,
  };
};
