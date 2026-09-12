import { ApiErrorResponse } from '@/types/api.type';
import axios, { AxiosError, isAxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

const timeOutEnv = process.env.NEXT_PUBLIC_API_TIMEOUT;

// Creating browser-side axios instance
export const axiosClient = axios.create({
  baseURL: '/api',
  timeout: timeOutEnv && typeof timeOutEnv === 'number' ? timeOutEnv : 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error)) return Promise.reject(normalizeAxiosError(error));

    return Promise.reject(normalizeUnknownError(error));
  },
);

function normalizeAxiosError(error: AxiosError): ApiErrorResponse {
  const responseData = error.response?.data as ApiErrorResponse | undefined;

  if (responseData?.message) {
    return responseData;
  }

  return {
    statusCode: error.status ?? StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || 'Something went wrong',
    dateTime: new Date().toISOString(),
  };
}

function normalizeUnknownError(error: unknown): ApiErrorResponse {
  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: error instanceof Error ? error.message : 'Unexpected error',
    dateTime: new Date().toISOString(),
  };
}
