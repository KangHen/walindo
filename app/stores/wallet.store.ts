// wallet.store.ts
import { defineStore } from "pinia";

import type { Wallet } from "~/types/models/wallet";

export const useWalletStore = defineStore("wallet", {
  state: () => ({
    wallet: null as Wallet | null,
  }),

  getters: {
    balance: (state) => state.wallet?.balance ?? 0,
  },

  actions: {
    setWallet(wallet: Wallet) {
      this.wallet = wallet;
    },

    clearWallet() {
      this.wallet = null;
    },
  },
});
