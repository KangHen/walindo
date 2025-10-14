// types/api/wallet.response.ts
import type { Wallet } from "../models/wallet";
import type { ApiResponse } from "./api.response";

export type WalletResponse = ApiResponse<Wallet>;
