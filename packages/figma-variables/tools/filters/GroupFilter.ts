import type { Filter } from 'style-dictionary/types';

import { FilterName } from '../types.js';

/**
 * Фильтр, который ограничивает токены только из указанной группы и токен-сета
 * Используется для отдельных файлов стилей, чтобы они содержали только свои токены
 */
export function createGroupFilter(group: string, tokenSetName?: string): Filter {
  return {
    name: `${FilterName.GroupFilter}-${group}${tokenSetName ? `-${tokenSetName}` : ''}`,
    filter: token => {
      // Проверяем, что токен начинается с нужной группы
      // Путь токена имеет формат: sn.group.name.property
      const path = token.path || [];
      if (path.length < 2) {
        return false;
      }
      // path[1] - это группа (после 'sn')
      if (path[1] !== group) {
        return false;
      }
      // Если указано имя токен-сета, проверяем, что токен из этого токен-сета
      // path[2] - это имя токен-сета (например, 'effect', 'gradient', 'typography')
      if (tokenSetName && path.length >= 3 && path[2] !== tokenSetName) {
        return false;
      }
      return true;
    },
  };
}
