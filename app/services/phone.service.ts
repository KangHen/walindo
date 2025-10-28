import { useNuxtApp } from "#app";
import type { UserPhoneNumberResponse } from "~/types/api/phone.response";
import { Routes } from "~/types/enums/routes";

export const PhoneDataService = {
  checkPhone: async (phoneNumber: string): Promise<UserPhoneNumberResponse> => {
    const { $api } = useNuxtApp();
    const response = await $api.post(Routes.PHONE, { phone: phoneNumber });
    return response as UserPhoneNumberResponse;
  },
};
