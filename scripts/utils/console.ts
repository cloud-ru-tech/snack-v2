/**
 * Обертка над @sbercloud/ft-logger для использования в скриптах
 */
import {
  logSuccess as ftLogSuccess,
  logInfo as ftLogInfo,
  logWarn,
  logError as ftLogError,
  logDebug as ftLogDebug,
  logSilly as ftLogSilly,
  logger,
} from '@sbercloud/ft-logger';

// Инициализируем логгер с уровнем info
logger.init('info');

export const logSuccess = ftLogSuccess;
export const logInfo = ftLogInfo;
export const logWarning = logWarn;
export const logError = ftLogError;
export const logDebug = ftLogDebug;
export const logSilly = ftLogSilly;

/**
 * Вывод подсказки (используем subsection для выделения)
 */
export const logHelp = (message: string) => {
  logger.subsection(message);
};
