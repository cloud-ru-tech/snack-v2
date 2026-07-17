export type LoggerLike = {
  success(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  separator(): void;
  subsection?(title: string): void;
  writeToFile?(message: string): void;
};

const SEPARATOR_LINE = '  ────────────────────────────────────────────────────────────────';

export function logFileValidationStatus(
  logger: LoggerLike,
  file: string,
  hasErrors: boolean,
  hasWarnings: boolean,
  errors: string[],
  warnings: string[],
  mode: 'strict' | 'warning' | 'off',
): void {
  if (hasErrors || hasWarnings) logger.warn(file);
  else logger.success(file);

  const allIssues = [...errors, ...warnings];
  const issueLevel = hasErrors && mode === 'strict' ? 'error' : 'warning';
  if (allIssues.length > 0) {
    if (logger.writeToFile) logger.writeToFile(SEPARATOR_LINE);
    for (const issue of allIssues) {
      const lines = issue.split('\n');
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];
        if (line === undefined) continue;
        const prefix = j === 0 ? ' - ' : '   ';
        if (issueLevel === 'error') logger.error(prefix + line);
        else logger.warn(prefix + line);
      }
    }
    if (logger.writeToFile) logger.writeToFile(SEPARATOR_LINE);
  }
}

export function logValidationResults(
  logger: LoggerLike,
  fileExtension: string,
  errorsByFile: Map<string, string[]>,
  warningsByFile: Map<string, string[]>,
): void {
  const hasErrors = errorsByFile.size > 0;
  const hasWarnings = warningsByFile.size > 0;
  if (!hasErrors && !hasWarnings) return;

  const ext = fileExtension.toUpperCase();
  const totalErrors = Array.from(errorsByFile.values()).reduce((s, a) => s + a.length, 0);
  const totalWarnings = Array.from(warningsByFile.values()).reduce((s, a) => s + a.length, 0);

  logger.subsection?.(`${ext} Validation`);

  if (hasErrors) {
    logger.error(`✗ ${ext} validation errors (${totalErrors}):`);
    const sorted = Array.from(errorsByFile.entries()).sort();
    for (let i = 0; i < sorted.length; i++) {
      const entry = sorted[i];
      if (!entry) continue;
      if (i > 0) logger.separator();
      const [file, errors] = entry;
      logger.info(`  • ${file}:`);
      for (const err of errors) {
        for (const line of err.split('\n')) logger.error(`    ${line}`);
      }
    }
  }
  if (hasWarnings) {
    logger.warn(`⚠ ${ext} validation warnings (${totalWarnings}):`);
    const sorted = Array.from(warningsByFile.entries()).sort();
    for (let i = 0; i < sorted.length; i++) {
      const entry = sorted[i];
      if (!entry) continue;
      if (i > 0) logger.separator();
      const [file, warnings] = entry;
      logger.info(`  • ${file}:`);
      for (const w of warnings) {
        for (const line of w.split('\n')) logger.warn(`    ${line}`);
      }
    }
  }
}
