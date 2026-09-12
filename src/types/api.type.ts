interface ApiBaseResponse {
  statusCode: number;
  message: string;
  dateTime?: string; // ISO 8601 - new Date().toISOString()
}

export interface ApiSuccessResponse<T> extends ApiBaseResponse {
  data: T;
}

export interface ApiErrorResponse extends ApiBaseResponse {
  errors?: Record<string, string[]>;
  detail?: string;
}
