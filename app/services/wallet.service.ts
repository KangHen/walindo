import type { WalletResponse } from "~/types/api";
import { useNuxtApp } from "#app";
import { Routes } from "~/types/enums/routes";

export const WalletService = {
  getWallet: async (): Promise<WalletResponse> => {
    const { $api } = useNuxtApp();
    return (await $api.get(Routes.WALLET)) as WalletResponse;
  },
};
