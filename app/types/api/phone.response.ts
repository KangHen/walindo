// types/api/phone.response.ts
import type { ApiResponse } from './api.response';

export interface UserPhoneData {
  name: string;
  phone: string;
}

export type UserPhoneNumberResponse = ApiResponse<UserPhoneData>;
