// services/auth.service.ts
import { useFetch } from '#app';

const config = useRuntimeConfig()

const API_URL = config.public.apiUrl;

export const AuthService = {
  async login(username: string, password: string): Promise<any> {
    const { data, error } = await useFetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: { username, password },
    })

    if (error.value) throw new Error(error.value?.message || 'Login failed')
    return data.value
  },

  async me(token: string) {
    const { data, error } = await useFetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (error.value) throw new Error(error.value?.message || 'Fetch user failed')
    return data.value
  },

  async logout() {
    const { data } = await useFetch(`${API_URL}/auth/logout`, { method: 'POST' })
    return data.value
  },
}
