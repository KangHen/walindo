// services/auth.service.ts
import { useNuxtApp } from "#app";
import type { AuthResponse } from "~/types/api/auth.response";
import type { UserResponse } from "~/types/api/user.response";
import { Routes } from "~/types/enums/routes";

const config = useRuntimeConfig();
const API_URL = config.public.apiUrl;

export const AuthService = {
  async login(
    username: string,
    password: string
  ): Promise<AuthResponse | null> {
    const { $api } = useNuxtApp();
    return (await $api.auth(Routes.AUTH, {
      username,
      password,
    })) as AuthResponse;
  },

  async me(): Promise<UserResponse | null> {
    const { $api } = useNuxtApp();
    return (await $api.auth(Routes.ME)) as UserResponse;
  },

  async logout(): Promise<void> {
    const { $api } = useNuxtApp();
    return await $api.auth(Routes.LOGOUT);
  },
};
