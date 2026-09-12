import z, { ZodError } from 'zod';

export type ErrorSource = 'THIRD_PARTY_API' | 'INTERNAL_API' | 'NETWORK' | 'VALIDATION' | 'UNKNOWN';

export interface AppPayloadError {
  message: string;
  code: string;
  status: number;
  source: ErrorSource;
  requestId?: string;

  // source = "VALIDATION" - Lỗi từ Zod
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
}

export class AppError extends Error {
  code: string;
  status: number;
  source: ErrorSource;
  requestId?: string;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];

  constructor(payload: AppPayloadError) {
    super(payload.message);

    this.name = 'AppError';
    this.code = payload.code;
    this.status = payload.status;
    this.source = payload.source;
    this.requestId = payload.requestId;
    this.fieldErrors = payload.fieldErrors;
    this.formErrors = payload.formErrors;
  }

  toJSON(): AppPayloadError {
    return {
      message: this.message,
      code: this.code,
      status: this.status,
      source: this.source,
      requestId: this.requestId,
      fieldErrors: this.fieldErrors,
      formErrors: this.formErrors,
    };
  }

  static isAppError(err: unknown): err is AppError {
    return err instanceof AppError;
  }

  static fromZodError(error: ZodError): AppError {
    const flattened = z.flattenError(error);

    return new AppError({
      message: 'Invalid input',
      code: 'VALIDATION_ERROR',
      status: 400,
      source: 'VALIDATION',
      fieldErrors: flattened.fieldErrors as Record<string, string[]>,
      formErrors: flattened.formErrors.length > 0 ? flattened.formErrors : undefined,
    });
  }

  static unknown(err: unknown): AppError {
    return new AppError({
      message: err instanceof Error ? err.message : 'Unexpected error',
      code: 'INTERNAL_ERROR',
      status: 500,
      source: 'UNKNOWN',
    });
  }
}
