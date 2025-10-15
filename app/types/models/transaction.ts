import type {
  TransactionStatus,
  TransactionType,
} from "@/types/enums/transaction";
import type { Mutation } from "./mutation";

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  trx_date: string;
  transaction_type: TransactionType;
  status: TransactionStatus;
  reference_code: string;
  icon: string;
  created_at: string;
  updated_at: string;
  mutations: Mutation[];
}

export interface TransactionParams {
  mode: "paginate" | `only-${number}-items`;
  page: number;
  perPage: number;
  type: TransactionType;
  status: TransactionStatus;
}
