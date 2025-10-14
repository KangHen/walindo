// services/auth.service.ts
import { useNuxtApp } from "#app";
import type { AuthResponse } from "~/types/api/auth.response";
import type { UserResponse } from "~/types/api/user.response";
import type { User } from "~/types/models/user";

const config = useRuntimeConfig();
const API_URL = config.public.apiUrl;

export const AuthService = {
  async login(
    username: string,
    password: string
  ): Promise<AuthResponse | null> {
    const { $api } = useNuxtApp();
    return (await $api.auth("auth", { username, password })) as AuthResponse;
  },

  async me(): Promise<UserResponse | null> {
    const { $api } = useNuxtApp();
    return (await $api.auth("me")) as UserResponse;
  },

  async logout(): Promise<void> {
    await useFetch(`${API_URL}/auth/logout`, { method: "POST" });
  },
};
