interface CybersoftApiBaseResponse<T> {
  statusCode: number;
  content: T;
  dateTime: string;
}

export type CyberSuccessResponse<T> = CybersoftApiBaseResponse<T>;

export type CyberErrorResponse =
  (CybersoftApiBaseResponse<string | null> & { message: string }) | null;
