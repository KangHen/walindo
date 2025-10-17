import { useNuxtApp } from "#app";
import type { ApiDeleteResponse } from "~/types/api/api.response";
import type { UserResponse } from "~/types/api/user.response";
import { Routes } from "~/types/enums/routes";
import type { User } from "~/types/models";

export const UserService = {
  getById: async (id: number): Promise<UserResponse> => {
    const { $api } = useNuxtApp();
    return (await $api.get(`${Routes.USER}/${id}`)) as UserResponse;
  },

  create: async (data: Partial<User>): Promise<UserResponse> => {
    const { $api } = useNuxtApp();
    return (await $api.post(Routes.USER, data)) as UserResponse;
  },

  update: async (id: number, data: Partial<User>): Promise<UserResponse> => {
    const { $api } = useNuxtApp();
    return (await $api.put(`${Routes.USER}/${id}`, data)) as UserResponse;
  },

  delete: async (id: number): Promise<ApiDeleteResponse> => {
    const { $api } = useNuxtApp();
    return (await $api.delete(`${Routes.USER}/${id}`)) as ApiDeleteResponse;
  },
};
