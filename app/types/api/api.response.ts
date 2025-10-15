// types/api/api.response.ts
export interface ApiResponse<T> {
  success: boolean;
  status?: number;
  message?: string;
  data?: T;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface PaginateMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface ApiPaginatedResponse<T> extends ApiResponse<T> {
  meta: PaginateMeta;
}
