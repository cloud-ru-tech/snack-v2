import { promises as fs } from 'fs';

import type { ValidateMode } from '../types.js';
import { validateCSS, validateCSSVariables } from '../validators/cssValidator.js';
import { validateSCSS } from '../validators/scssValidator.js';

export async function validateGeneratedFiles(
  files: string[],
  validateMode: ValidateMode,
  onFileResult?: (file: string, hasErrors: boolean, hasWarnings: boolean, errors: string[], warnings: string[]) => void,
): Promise<{
  errors: string[];
  warnings: string[];
  errorsByFile: Map<string, string[]>;
  warningsByFile: Map<string, string[]>;
}> {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];
  const errorsByFile = new Map<string, string[]>();
  const warningsByFile = new Map<string, string[]>();

  if (validateMode === 'off') {
    return { errors: allErrors, warnings: allWarnings, errorsByFile, warningsByFile };
  }

  for (const file of files) {
    try {
      let fileErrors: string[] = [];
      let fileWarnings: string[] = [];

      if (file.endsWith('.css') || file.endsWith('.module.css')) {
        const content = await fs.readFile(file, 'utf-8');
        const cssResult = await validateCSS(content, validateMode);

        fileErrors = cssResult.errors.map(err => err);
        fileWarnings = cssResult.warnings.map(warn => warn);

        // Дополнительная проверка только для объединенного файла tokens.css / tokens.module.css:
        // убеждаемся, что каждая ссылка var(--foo) указывает на существующую CSS‑переменную
        const isTokensFile =
          file.endsWith('/css/tokens.css') ||
          file.endsWith('/css/tokens.module.css') ||
          file.endsWith('\\css\\tokens.css') ||
          file.endsWith('\\css\\tokens.module.css') ||
          file.endsWith('tokens.css') ||
          file.endsWith('tokens.module.css');

        if (isTokensFile) {
          const varsResult = validateCSSVariables(content, validateMode);
          fileErrors.push(...varsResult.errors);
          fileWarnings.push(...varsResult.warnings);
        }
      } else if (file.endsWith('.scss') || file.endsWith('.module.scss')) {
        // For SCSS, pass the file path instead of content to allow resolving imports
        const result = await validateSCSS(file, validateMode);
        // Keep full error messages with code snippets, but remove the "SCSS compilation error: " prefix
        fileErrors = result.errors.map(err => err.replace(/^SCSS compilation error:\s*/, ''));
        // Keep full warning messages with code snippets, but remove the "SCSS compilation warning: " prefix
        fileWarnings = result.warnings.map(warn => warn.replace(/^SCSS compilation warning:\s*/, ''));
      }

      if (fileErrors.length > 0) {
        allErrors.push(...fileErrors.map(err => `${file}: ${err}`));
        errorsByFile.set(file, fileErrors);
      }
      if (fileWarnings.length > 0) {
        allWarnings.push(...fileWarnings.map(warn => `${file}: ${warn}`));
        warningsByFile.set(file, fileWarnings);
      }

      // Call callback with results for this file
      if (onFileResult) {
        onFileResult(file, fileErrors.length > 0, fileWarnings.length > 0, fileErrors, fileWarnings);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const errorMsg = `Failed to read file - ${message}`;
      const fileErrors = [errorMsg];
      const fileWarnings: string[] = [];

      if (validateMode === 'strict') {
        allErrors.push(`${file}: ${errorMsg}`);
        errorsByFile.set(file, fileErrors);
      } else {
        allWarnings.push(`${file}: ${errorMsg}`);
        warningsByFile.set(file, fileErrors);
      }

      // Call callback with error result
      if (onFileResult) {
        onFileResult(file, validateMode === 'strict', validateMode !== 'strict', fileErrors, fileWarnings);
      }
    }
  }

  return { errors: allErrors, warnings: allWarnings, errorsByFile, warningsByFile };
}
