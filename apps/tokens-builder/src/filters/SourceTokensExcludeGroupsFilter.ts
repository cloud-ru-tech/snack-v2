import type { Filter } from 'style-dictionary/types';

import { FilterName } from '../types.js';

/**
 * Составной фильтр, который проверяет и SourceTokens, и ExcludeGroups
 * Используется для CSS Figma Styles, где нужны оба условия
 */
export function createSourceTokensExcludeGroupsFilter(excludeGroups: string[]): Filter {
  return {
    name: `${FilterName.SourceTokens}-${FilterName.ExcludeGroups}`,
    filter: token => {
      // Проверяем, что токен является source токеном
      if (!token.isSource) {
        return false;
      }

      // Если нет групп для исключения, пропускаем все source токены
      if (excludeGroups.length === 0) {
        return true;
      }

      // Сначала проверяем путь к исходному файлу (если доступен)
      // Это более надежный способ определить исходную группу токена
      if (token.filePath) {
        const normalizedPath = token.filePath.replace(/\\/g, '/');
        const pathParts = normalizedPath.split('/');

        // Ищем имя группы в пути к файлу
        // Путь обычно имеет формат: .../06_languageMode/.../file.json
        for (const part of pathParts) {
          if (excludeGroups.includes(part)) {
            return false; // Исключаем токен, если его файл находится в исключенной группе
          }
        }
      }

      // Также проверяем путь токена (на случай, если filePath недоступен)
      // Путь токена имеет формат: ['sn', 'group', 'name', 'property', ...]
      const tokenPath = token.path || [];
      if (tokenPath.length >= 2) {
        const group = tokenPath[1];
        if (excludeGroups.includes(group)) {
          return false; // Исключаем токен, если его группа в списке исключенных
        }
      }

      // Пропускаем токен, если он не из исключенных групп
      return true;
    },
  };
}
