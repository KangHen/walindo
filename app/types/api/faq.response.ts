// types/api/faq.response.ts
import type { Faq } from "../models";
import type { ApiResponse } from "./api.response";

export type FaqResponse = ApiResponse<Faq[]>;
