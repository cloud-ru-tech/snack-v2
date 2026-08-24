import { LinksGroupBlockColor } from '../types';

/**
 * Резолвит цвет блока группы с учётом глобального переключателя `showGroupsColors`.
 *
 * `showGroupsColors === false` скрывает цвета всех групп — возвращает `undefined`,
 * что даёт `SortableGroup` дефолт `'neutral'`.
 */
export function resolveGroupBlockColor(
  blockColor: LinksGroupBlockColor | undefined,
  showGroupsColors: boolean | undefined,
): LinksGroupBlockColor | undefined {
  return showGroupsColors === false ? undefined : blockColor;
}
