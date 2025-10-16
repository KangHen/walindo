import { ref, computed } from "vue";
import { TransactionService } from "~/services/transaction.service";
import { useTransactionStore } from "~/stores/transaction.store";
import type { TransactionParams } from "~/types/models/transaction";

export const useTransaction = () => {
  const store = useTransactionStore();
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);

  const fetchTransactions = async (params?: Partial<TransactionParams>) => {
    loading.value = true;
    // errorMessage.value = null
    try {
      const res = await TransactionService.getAll(params);
      store.setTransactions(res.data ?? []);
    } catch (err: any) {
      errorMessage.value = err.message || "Failed to load transactions";
    } finally {
      loading.value = false;
    }
  };

  const fetchTransactionById = async (id: number | string) => {
    loading.value = true;
    errorMessage.value = null;
    try {
      const res = await TransactionService.getById(id);
      store.setSelectedTransaction(res.data ?? null);
    } catch (err: any) {
      errorMessage.value = err.message || "Transaction not found";
    } finally {
      loading.value = false;
    }
  };

  return {
    transactions: computed(() => store.transactions),
    selectedTransaction: computed(() => store.selectedTransaction),
    loading,
    errorMessage,
    fetchTransactions,
    fetchTransactionById,
  };
};
