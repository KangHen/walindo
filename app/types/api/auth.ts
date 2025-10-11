// types/api/auth.ts
import type { User } from '~/types/models/user';
export interface AuthResponse {
    token: string;
    accessToken: string;
    refreshToken: string;
    user: User;
}