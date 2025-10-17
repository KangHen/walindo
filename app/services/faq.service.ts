import type { FaqResponse } from "~/types/api";
import { useNuxtApp } from "#app";
import { Routes } from "~/types/enums/routes";

export const FaqService = {
  getAll: async (): Promise<FaqResponse> => {
    const { $api } = useNuxtApp();
    return (await $api.get(Routes.FAQS)) as FaqResponse;
  },
};
