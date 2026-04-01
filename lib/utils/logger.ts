/**
 * LOGGER ESTRUCTURADO
 * 
 * Emite logs en formato JSON para facilitar búsqueda y filtrado en producción
 * (Vercel Logs, Datadog, CloudWatch, etc.)
 * 
 * Uso:
 *   logger.info('webhook.received', { paymentId: '123', type: 'payment' })
 *   logger.error('webhook.failed', { error: err.message, paymentId: '123' })
 */

type LogLevel = 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  event: string
  timestamp: string
  data?: Record<string, unknown>
}

function emit(level: LogLevel, event: string, data?: Record<string, unknown>) {
  const entry: LogEntry = {
    level,
    event,
    timestamp: new Date().toISOString(),
    ...(data && { data }),
  }

  const json = JSON.stringify(entry)

  switch (level) {
    case 'error':
      console.error(json)
      break
    case 'warn':
      console.warn(json)
      break
    default:
      console.log(json)
  }
}

export const logger = {
  info: (event: string, data?: Record<string, unknown>) => emit('info', event, data),
  warn: (event: string, data?: Record<string, unknown>) => emit('warn', event, data),
  error: (event: string, data?: Record<string, unknown>) => emit('error', event, data),
}
