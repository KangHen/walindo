// composables/useAuth.ts
import { AuthService } from '~/services/auth.service';

export const useAuth = () => {
  const authStore = useAuthStore()
  const loading = ref(false)
  const errorMessage = ref<string | null>(null)

  const login = async (email: string, password: string) => {
    loading.value = true
    errorMessage.value = null

    try {
      const res = await AuthService.login(email, password)
      if (res?.accessToken || res?.token) {
        authStore.setAuth(res.accessToken ?? res.token, res.user ?? res)
        navigateTo('/')
      } else {
        throw new Error('User or password is incorrect')
      }

    } catch (err: any) {
      errorMessage.value = err.message || 'Login failed'
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await AuthService.logout()
    } catch (_) {}
    authStore.clearAuth()
    navigateTo('/login')
  }

  const initAuth = () => {
    authStore.loadAuthFromStorage()
  }

  return {
    user: computed(() => authStore.user),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    loading,
    errorMessage,
    login,
    logout,
    initAuth,
  }
}
