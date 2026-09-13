export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  [key: string]: unknown;
}

export type Transport = (payload: LogPayload) => void;

export interface LoggerOptions {
  minLevel?: LogLevel;
  transport?: Transport;
  bindings?: Record<string, unknown>;
}
