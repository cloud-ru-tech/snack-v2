import type { AnyRecord, TokenSet } from '../types.js';

/**
 * Извлекает все ссылки на токены из значения
 * Ссылки имеют формат: {sn.path.to.token}
 */
function extractTokenReferences(value: unknown): string[] {
  const references: string[] = [];

  if (typeof value === 'string') {
    // Находим все ссылки вида {sn.xxx}
    const matches = value.matchAll(/\{sn\.([^}]+)\}/g);
    for (const match of matches) {
      const reference = match[1];
      if (reference) {
        references.push(reference);
      }
    }
  } else if (value && typeof value === 'object') {
    // Рекурсивно обрабатываем объекты
    if (Array.isArray(value)) {
      for (const item of value) {
        references.push(...extractTokenReferences(item));
      }
    } else {
      for (const item of Object.values(value)) {
        references.push(...extractTokenReferences(item));
      }
    }
  }

  return references;
}

/**
 * Проверяет, начинается ли путь токена с исключенной группы
 * Путь: '06_languageMode.ru.text' -> группа: '06_languageMode'
 */
function isExcludedGroup(referencePath: string, excludeGroups: string[]): boolean {
  const pathParts = referencePath.split('.');
  if (pathParts.length === 0) {
    return false;
  }

  // Первая часть после 'sn' - это группа
  const group = pathParts[0];
  return excludeGroups.includes(group);
}

/**
 * Валидирует токены на наличие ссылок на исключенные группы
 *
 * Этап: Валидация перед сборкой
 * Шаг: Проверка ссылок на исключенные токены
 */
export function validateTokenReferences(
  tokenSets: TokenSet[],
  excludeGroups: string[],
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (excludeGroups.length === 0) {
    return { errors, warnings };
  }

  // Собираем все ссылки из всех токенов
  for (const tokenSet of tokenSets) {
    // Пропускаем токены из исключенных групп
    if (excludeGroups.includes(tokenSet.group)) {
      continue;
    }

    if (!tokenSet.content) {
      continue;
    }

    // Рекурсивно обходим все значения в токене
    function traverseObject(obj: AnyRecord, path: string[] = []): void {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = [...path, key];

        // Проверяем значение на наличие ссылок
        if (value && typeof value === 'object' && '$value' in value) {
          const tokenValue = (value as { $value?: unknown }).$value;
          const references = extractTokenReferences(tokenValue);

          for (const reference of references) {
            if (isExcludedGroup(reference, excludeGroups)) {
              const tokenPath = currentPath.join('.');
              const referenceGroup = reference.split('.')[0];
              const message = `Token "${tokenSet.path}.${tokenPath}" references excluded group "${referenceGroup ?? 'unknown'}" via "${reference}"`;

              errors.push(message);
            }
          }
        } else if (value && typeof value === 'object' && !Array.isArray(value)) {
          // Рекурсивно обходим вложенные объекты
          traverseObject(value as AnyRecord, currentPath);
        }
      }
    }

    traverseObject(tokenSet.content);
  }

  return { errors, warnings };
}
