import { basename } from 'path';
import { getGroupConfig } from '../../shared/groupConfig';
import { Validator } from './types';

const getErrorResult = (paths: string[]) =>
  ({
    level: 'warning',
    message: `Дублирующие по контенту иконки: ${paths.map(p => `\n\t- ${p}`)}`,
  }) as const;

/**
 * Проверяет уникальность внутри одной группы (префикс пути до первого /). Themed-группы (logos)
 * исключены для пары Light/Dark ОДНОГО бренда: некоторые брендовые знаки по дизайну рендерятся
 * одинаково в обеих темах, поэтому их исходники Light/Dark законно байт-идентичны — реальный
 * случайный дубль — это только совпадение содержимого с базовым именем ДРУГОГО бренда.
 */
export const validateIconUniqueness: Validator = {
  validate: ({ icon, allIcons }) => {
    const iconGroup = icon.path.split('/')[0];
    const sameGroup = allIcons.filter(i => i.path.startsWith(iconGroup + '/'));
    const duplicates = sameGroup.filter(({ content }) => content === icon.content);

    const base = basename(icon.path, '.svg').replace(/(Light|Dark)$/, '');

    if (getGroupConfig(iconGroup).themed) {
      const otherDuplicates = duplicates.filter(m => basename(m.path, '.svg').replace(/(Light|Dark)$/, '') !== base);
      return otherDuplicates.length ? getErrorResult([icon, ...otherDuplicates].map(i => i.path)) : null;
    }

    if (duplicates.length > 0) {
      return getErrorResult([icon, ...duplicates].map(i => i.path));
    }

    return null;
  },
};
