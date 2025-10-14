import { WalletService } from "~/services/wallet.service";

export const useWallet = () => {
  const store = useWalletStore();
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);

  const fetchWallet = async () => {
    loading.value = true;
    errorMessage.value = null;

    try {
      const response = await WalletService.getWallet();
      if (response.success && response.data) {
        store.setWallet(response.data);
      } else {
        errorMessage.value = response.message || "Failed to fetch wallet";
      }
    } catch (error) {
      errorMessage.value = "Failed to fetch wallet";
    } finally {
      loading.value = false;
    }
  };

  return {
    wallet: store.wallet,
    balance: computed(() => store.balance),
    fetchWallet,
    loading,
    errorMessage,
  };
};
