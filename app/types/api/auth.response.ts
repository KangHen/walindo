// types/api/auth.ts
import type { User } from "~/types/models/user";
export interface AuthResponse {
  token: string;
  refresh_token: string;
  user: User;
}
