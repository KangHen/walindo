// services/transaction.service.ts
import { useFetch } from "#app";
import type {
  TransactionResponse,
  TransactionListResponse,
} from "~/types/api/transaction.response";
import type {
  Transaction,
  TransactionParams,
} from "~/types/models/transaction";
import { Routes } from "~/types/enums/routes";

const config = useRuntimeConfig();

const API_URL = `${config.public.apiUrl}/transactions`;

export const TransactionService = {
  async getAll(
    params?: Partial<TransactionParams>
  ): Promise<TransactionListResponse> {
    const { $api } = useNuxtApp();
    try {
      return (await $api.get(Routes.TRANSACTIONS, {
        ...params,
      })) as TransactionListResponse;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch transactions");
    }
  },

  async getById(id: number | string): Promise<TransactionResponse> {
    const { $api } = useNuxtApp();
    try {
      return (await $api.get(
        `${Routes.TRANSACTIONS}/${id}`
      )) as TransactionResponse;
    } catch (error: any) {
      throw new Error(error.message || "Transaction not found");
    }
  },

  async create(payload: Partial<Transaction>): Promise<TransactionResponse> {
    const { $api } = useNuxtApp();
    try {
      return (await $api.post(
        Routes.TRANSACTIONS,
        payload
      )) as TransactionResponse;
    } catch (error: any) {
      throw new Error(error.message || "Failed to create transaction");
    }
  },

  async update(
    id: number,
    payload: Partial<Transaction>
  ): Promise<TransactionResponse> {
    const { $api } = useNuxtApp();
    try {
      return (await $api.put(
        `${Routes.TRANSACTIONS}/${id}`,
        payload
      )) as TransactionResponse;
    } catch (error: any) {
      throw new Error(error.message || "Failed to update transaction");
    }
  },

  async delete(id: number): Promise<void> {
    const { $api } = useNuxtApp();
    try {
      await $api.delete(`${Routes.TRANSACTIONS}/${id}`);
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete transaction");
    }
  },
};
