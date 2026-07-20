import type { BaseConfig, TokenSet } from '../../types.js';
import { validateTokenReferences } from '../../validators/tokenReferences.js';

type PreparedTokenData = {
  tokenSets: TokenSet[];
};

/**
 * Этап 0: Валидация ссылок на исключенные токены
 *
 * Проверяет, нет ли ссылок на токены из исключенных групп перед началом сборки.
 *
 * Что происходит:
 * 1. Проверяем, есть ли исключенные группы
 * 2. Проходим по всем токенам (кроме исключенных)
 * 3. Извлекаем все ссылки из значений токенов
 * 4. Проверяем, не ссылаются ли они на исключенные группы
 * 5. Выдаем ошибки или предупреждения
 *
 * Результат: список ошибок и предупреждений
 */
export function validateTokenReferencesStep(
  data: PreparedTokenData,
  config: BaseConfig,
): { errors: string[]; warnings: string[] } {
  const excludeGroups = config.excludeGroups ?? [];

  if (excludeGroups.length === 0) {
    return { errors: [], warnings: [] };
  }

  // Валидируем ссылки на исключенные токены
  const result = validateTokenReferences(data.tokenSets, excludeGroups);

  return result;
}
