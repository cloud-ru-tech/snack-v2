/**
 * Обертка над consola для использования в скриптах
 */
import { consola } from 'consola';

type LogFn = (...args: unknown[]) => void;

const log =
  (fn: LogFn): LogFn =>
  (...args) =>
    fn(...args);

export const logSuccess = log(consola.success as LogFn);
export const logInfo = log(consola.info as LogFn);
export const logWarning = log(consola.warn as LogFn);
export const logError = log(consola.error as LogFn);
export const logDebug = log(consola.debug as LogFn);
export const logSilly = log(consola.log as LogFn);

/**
 * Вывод подсказки (информационное сообщение)
 */
export const logHelp = (message: string) => {
  consola.log(message);
};
