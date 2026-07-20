import { type ConsolaInstance, createConsola } from 'consola';

import type { LogLevel } from '../../types.js';
import { createLogFileWriter, formatArgsForFile, type LogFileWriter } from './loggerFile.js';
import { logFileValidationStatus, logValidationResults } from './validationOutput.js';

const isNode = typeof process !== 'undefined' && process.versions?.node !== undefined;
const LEVEL_MAP: Record<LogLevel, number> = { error: 1, warning: 2, info: 3, debug: 4 };

export class Logger {
  private consola: ConsolaInstance;
  private fileWriter: LogFileWriter | null = null;

  constructor() {
    this.consola = createConsola({ level: 3 });
  }

  init(level: LogLevel, logFile?: string): void {
    this.consola.level = LEVEL_MAP[level] ?? 3;
    if (logFile && isNode) {
      createLogFileWriter(logFile)
        .then(writer => {
          this.fileWriter = writer;
        })
        .catch(err => {
          console.error(`Failed to initialize log file ${logFile}:`, err);
        });
    } else if (logFile && !isNode) {
      console.warn('Log file is only supported in Node.js environment');
    }
  }

  setEnabled(enabled: boolean): void {
    this.consola.level = enabled ? 3 : 0;
  }

  async setLogFile(filePath: string): Promise<void> {
    if (!isNode) {
      console.warn('Log file is only supported in Node.js environment');
      return;
    }
    const writer = await createLogFileWriter(filePath);
    this.fileWriter = writer;
  }

  writeToFile(message: string): void {
    if (this.fileWriter?.writable) this.fileWriter.write(message);
  }

  closeLogFile(): void {
    if (this.fileWriter) {
      this.fileWriter.close();
      this.fileWriter = null;
    }
  }

  success(message: string, ...args: unknown[]): void {
    this.consola.success(message, ...args);
    if (this.fileWriter) this.writeToFile(`[SUCCESS] ✓ ${message}${formatArgsForFile(args)}`);
  }

  info(message: string, ...args: unknown[]): void {
    this.consola.info(message, ...args);
    if (this.fileWriter) this.writeToFile(`[INFO] ℹ ${message}${formatArgsForFile(args)}`);
  }

  warn(message: string, ...args: unknown[]): void {
    this.consola.warn(message, ...args);
    if (this.fileWriter) this.writeToFile(`[WARN] ⚠ ${message}${formatArgsForFile(args)}`);
  }

  error(message: string, ...args: unknown[]): void {
    this.consola.error(message, ...args);
    if (this.fileWriter) this.writeToFile(`[ERROR] ✗ ${message}${formatArgsForFile(args)}`);
  }

  debug(message: string, ...args: unknown[]): void {
    this.consola.debug(message, ...args);
    if (this.fileWriter) this.writeToFile(`[DEBUG] 🔍 ${message}${formatArgsForFile(args)}`);
  }

  logMessage(message: string): void {
    this.info(message);
  }

  separator(): void {
    this.consola.log('');
    if (this.fileWriter) this.writeToFile('');
  }

  section(title: string): void {
    const sep = '─'.repeat(Math.max(40, title.length + 4));
    this.consola.log('\x1b[36m' + sep + '\x1b[0m');
    this.consola.log('\x1b[36m  ' + title + '\x1b[0m');
    this.consola.log('\x1b[36m' + sep + '\x1b[0m');
    if (this.fileWriter) {
      this.writeToFile(sep);
      this.writeToFile('  ' + title);
      this.writeToFile(sep);
    }
  }

  subsection(title: string): void {
    this.consola.log('\x1b[1m  ' + title + '\x1b[0m');
    if (this.fileWriter) this.writeToFile('  ' + title);
  }

  fileList(files: string[], type: 'css' | 'scss' | 'ts'): void {
    if (files.length === 0) return;
    const labels = { css: 'CSS', scss: 'SCSS', ts: 'TypeScript' };
    const label = `  └─ ${labels[type]} files (${files.length}):`;
    this.info(label);
    for (const file of [...files].sort()) this.info(`    • ${file}`);
  }

  fileValidationStatus(
    file: string,
    hasErrors: boolean,
    hasWarnings: boolean,
    errors: string[],
    warnings: string[],
    mode: 'strict' | 'warning' | 'off',
  ): void {
    logFileValidationStatus(this, file, hasErrors, hasWarnings, errors, warnings, mode);
  }

  validationResults(
    fileExtension: string,
    errorsByFile: Map<string, string[]>,
    warningsByFile: Map<string, string[]>,
  ): void {
    logValidationResults(this, fileExtension, errorsByFile, warningsByFile);
  }
}
