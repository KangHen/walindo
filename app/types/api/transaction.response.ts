// types/api/transaction.response.ts
import type { Transaction } from "~/types/models/transaction";
import type { ApiResponse } from "./api.response";

export type TransactionListResponse = ApiResponse<Transaction[]>;
export type TransactionResponse = ApiResponse<Transaction>;
