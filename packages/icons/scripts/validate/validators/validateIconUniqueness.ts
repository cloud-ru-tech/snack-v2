import { basename } from 'path';
import { getGroupConfig } from '../../shared/groupConfig';
import { Validator } from './types';

/**
 * Проверяет уникальность внутри одной группы (префикс пути до первого /). Themed-группы (logos)
 * исключены для пары Light/Dark ОДНОГО бренда: некоторые брендовые знаки по дизайну рендерятся
 * одинаково в обеих темах, поэтому их исходники Light/Dark законно байт-идентичны — реальный
 * случайный дубль — это только совпадение содержимого с базовым именем ДРУГОГО бренда.
 */
export const validateIconUniqueness: Validator = {
  error: `дублирующаяся иконка внутри группы, удали её`,
  validate: ({ icon, allIcons }) => {
    const iconGroup = icon.path.split('/')[0];
    const sameGroup = allIcons.filter(i => i.path.startsWith(iconGroup + '/'));
    const matches = sameGroup.filter(({ content }) => content === icon.content);
    if (matches.length === 1) return true;

    if (!getGroupConfig(iconGroup).themed) return false;

    const base = basename(icon.path, '.svg').replace(/(Light|Dark)$/, '');
    return matches.every(m => basename(m.path, '.svg').replace(/(Light|Dark)$/, '') === base);
  },
};
