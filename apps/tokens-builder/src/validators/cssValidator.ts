import type { ValidateMode } from '../types.js';

type ValidationResult = { errors: string[]; warnings: string[] };

/**
 * Basic CSS validation.
 *
 * - Checks for unmatched `{` / `}` braces
 * - Checks for unclosed single / double quotes
 *
 * This validator is intentionally lightweight and dependency-free.
 * If we ever need full CSS parsing, we can integrate PostCSS here.
 */
export async function validateCSS(css: string, mode: ValidateMode): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (mode === 'off') {
    return { errors, warnings };
  }

  // Check for unclosed braces
  const openBraces = (css.match(/\{/g) || []).length;
  const closeBraces = (css.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    const message = `Unmatched braces: ${openBraces} opening, ${closeBraces} closing`;
    if (mode === 'strict') {
      errors.push(message);
    } else {
      warnings.push(message);
    }
  }

  // Check for unclosed quotes
  const singleQuotes = (css.match(/'/g) || []).length;
  const doubleQuotes = (css.match(/"/g) || []).length;
  if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) {
    const message = 'Unclosed quotes detected';
    if (mode === 'strict') {
      errors.push(message);
    } else {
      warnings.push(message);
    }
  }

  return { errors, warnings };
}

/**
 * Validates that all CSS custom properties used via `var(--foo)` are
 * defined as custom properties somewhere in the same CSS content.
 *
 * This is used for the combined `tokens.css` file to catch typos in
 * variable names and invalid references between layers.
 */
export function validateCSSVariables(css: string, mode: ValidateMode): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (mode === 'off') {
    return { errors, warnings };
  }

  // Находим диапазоны комментариев, чтобы игнорировать var()/--foo внутри них
  const commentRanges: Array<{ start: number; end: number }> = [];
  const commentRegex = /\/\*[\s\S]*?\*\//g;
  let commentMatch: RegExpExecArray | null;
  while ((commentMatch = commentRegex.exec(css)) !== null) {
    commentRanges.push({ start: commentMatch.index, end: commentMatch.index + commentMatch[0].length });
  }

  const isInComment = (index: number): boolean =>
    commentRanges.some(range => index >= range.start && index < range.end);

  const getLocation = (index: number): { line: number; column: number } => {
    let line = 1;
    let column = 1;
    for (let i = 0; i < index; i += 1) {
      if (css[i] === '\n') {
        line += 1;
        column = 1;
      } else {
        column += 1;
      }
    }
    return { line, column };
  };

  // Один проход по файлу сверху вниз:
  // - собираем все определения custom properties: `--foo-bar: ...;`
  // - отслеживаем, какие из них уже встретились "выше"
  // - проверяем, что каждая var(--foo) ссылается на уже определённую выше переменную
  const allDefinedVars = new Set<string>();
  const definedSoFar = new Set<string>();
  const seenProblems = new Set<string>();

  const scanRegex = /(--[A-Za-z0-9_-]+)(?=\s*:)|var\(\s*(--[A-Za-z0-9_-]+)/g;
  let match: RegExpExecArray | null;

  while ((match = scanRegex.exec(css)) !== null) {
    const matchIndex = match.index ?? 0;

    // Пропускаем всё, что лежит внутри комментариев
    if (isInComment(matchIndex)) {
      continue;
    }

    const [, defName, useName] = match;

    if (defName) {
      // Определение custom property
      allDefinedVars.add(defName);
      definedSoFar.add(defName);
      continue;
    }

    if (useName) {
      const varName = useName;

      // Уже была зафиксирована проблема по этой переменной – не дублируем сообщение
      if (seenProblems.has(varName)) {
        continue;
      }

      if (!definedSoFar.has(varName)) {
        seenProblems.add(varName);

        const { line, column } = getLocation(matchIndex);
        const isDefinedSomewhere = allDefinedVars.has(varName);
        const message = isDefinedSomewhere
          ? `Undefined CSS variable "${varName}" used via var() before it is defined in this file (at line ${line}, column ${column}).`
          : `Undefined CSS variable "${varName}" used via var() – no custom property with this name is defined in this file (at line ${line}, column ${column}).`;

        if (mode === 'strict') {
          errors.push(message);
        } else {
          warnings.push(message);
        }
      }
    }
  }

  return { errors, warnings };
}
