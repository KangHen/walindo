// services/auth.service.ts
import { useFetch } from '#app';
import type { AuthResponse } from '~/types/api/auth';
import type { User } from '~/types/models/user';

const config = useRuntimeConfig()

const API_URL = config.public.apiUrl;

export const AuthService = {
  async login(username: string, password: string): Promise<AuthResponse | null> {
    const { data, error } = await useFetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: { username, password },
    })

    if (error.value) throw new Error(error.value?.message || 'Login failed')
    return data.value as AuthResponse;
  },

  async me(token: string): Promise<User | null> {
    const { data, error } = await useFetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (error.value) throw new Error(error.value?.message || 'Fetch user failed')
    return data.value as User | null;
  },

  async logout(): Promise<void> {
    await useFetch(`${API_URL}/auth/logout`, { method: 'POST' })
  },
}
