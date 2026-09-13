import { logLevelSchema } from '@/schemas/log-level.schema';
import { LoggerOptions, LogLevel, LogPayload, Transport } from './logger.type';

// TODO: Add validate environment variables

const isServer = typeof window === 'undefined';

const LOG_LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const consoleTransport: Transport = (payload) => {
  switch (payload.level) {
    case 'error':
      console.error(payload);
      break;
    case 'warn':
      console.warn(payload);
      break;
    default:
      console.log(payload);
      break;
  }
};

const normalizeCtx = (ctx?: Record<string, unknown>): Record<string, unknown> => {
  if (!ctx) return {};

  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(ctx)) {
    out[key] =
      value instanceof Error
        ? {
            name: value.name,
            message: value.message,
            stack: value.stack,
          }
        : value;
  }
  return out;
};

export const createLogger = (options: LoggerOptions) => {
  const { minLevel = 'debug', transport = consoleTransport, bindings = {} } = options;

  const log = (level: LogLevel, message: string, ctx?: Record<string, unknown>) => {
    if (LOG_LEVEL_WEIGHT[level] < LOG_LEVEL_WEIGHT[minLevel]) return;

    const payload: LogPayload = {
      ...bindings,
      ...normalizeCtx(ctx),
      level,
      message,
      timestamp: new Date().toISOString(),
    };

    transport(payload);
  };

  return {
    debug: (message: string, ctx?: Record<string, unknown>) => log('debug', message, ctx),
    info: (message: string, ctx?: Record<string, unknown>) => log('info', message, ctx),
    warn: (message: string, ctx?: Record<string, unknown>) => log('warn', message, ctx),
    error: (message: string, ctx?: Record<string, unknown>) => log('error', message, ctx),

    child(extra: Record<string, unknown>) {
      return createLogger({
        minLevel,
        transport,
        bindings: { ...bindings, ...extra },
      });
    },
  };
};

export type Logger = ReturnType<typeof createLogger>;

const resolveConfiguredLevel = (): LogLevel | undefined => {
  const raw = isServer ? process.env.APP_LOG_LEVEL : process.env.NEXT_PUBLIC_LOG_LEVEL;

  if (!raw) return undefined;

  const parsed = logLevelSchema.safeParse(raw);

  if (!parsed.success) {
    console.warn(`Invalid log level "${raw}", falling back to default.`);
    return undefined;
  }

  return parsed.data;
};

const configuredLevel = resolveConfiguredLevel();

export const logger = createLogger({
  minLevel: configuredLevel ?? (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
});
