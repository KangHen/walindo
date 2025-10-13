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

export interface ApiPaginatedResponse<T> {
  success: boolean;
  message?: string;
  status?: number;
  data: {
    data: T[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}
