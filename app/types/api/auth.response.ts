// types/api/auth.ts
import type { User } from "~/types/models/user";
import type { ApiResponse } from "./api.response";

interface Auth {
  token: string;
  refresh_token: string;
  user: User;
}
export type AuthResponse = ApiResponse<Auth>;
