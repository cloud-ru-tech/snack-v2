export { Logger } from './Logger.js';
export { createLogFileWriter, formatArgsForFile, stripAnsi } from './loggerFile.js';
export type { LogFileWriter } from './loggerFile.js';
export { logFileValidationStatus, logValidationResults } from './validationOutput.js';
export type { LoggerLike } from './validationOutput.js';

import { Logger } from './Logger.js';

export const logger = new Logger();
export const logSuccess = (message: string, ...args: unknown[]) => logger.success(message, ...args);
export const logInfo = (message: string, ...args: unknown[]) => logger.info(message, ...args);
export const logWarn = (message: string, ...args: unknown[]) => logger.warn(message, ...args);
export const logError = (message: string, ...args: unknown[]) => logger.error(message, ...args);
export const logDebug = (message: string, ...args: unknown[]) => logger.debug(message, ...args);
export const logMessage = (message: string) => logger.logMessage(message);
