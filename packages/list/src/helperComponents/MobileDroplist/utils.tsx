import { ChevronRightSVG } from '@ds/icons/interface/system';
import { MouseEvent } from 'react';

import { BaseItemProps, Item, NextListItem } from '../../components/Items';
import { ITEM_TYPE } from '../../constants';

/** Текст `label` next-list-айтема — заголовок шапки sheet'а при заходе во вложенный список. */
export function nextListOption(item: NextListItem): string | undefined {
  const { content } = item;
  if (content && typeof content === 'object' && 'label' in content) {
    return String((content as { label: string | number }).label);
  }
  return undefined;
}

/**
 * Готовит айтемы текущего уровня sheet'а:
 * - `next-list` превращается в базовый айтем с шевроном `>`, клик по которому уводит на уровень вложенного
 *   списка (drill-down), а не открывает второй BottomSheet (десктопный nested-popover на mobile неприменим);
 * - `group` / `group-select` / `collapse` рекурсивно обрабатываются (внутри них тоже может быть `next-list`);
 * - базовые айтемы (action-меню без `selection`) при `closeOnClick` закрывают sheet по клику.
 */
export function buildLevelItems(
  items: Item[],
  onDrill: (item: NextListItem) => void,
  onClose: () => void,
  closeOnClick: boolean,
): Item[] {
  return items.map(item => {
    if (item && typeof item === 'object' && 'type' in item) {
      if (item.type === ITEM_TYPE.NextList) {
        const next = item;

        // next-list-only поля (вложенный список, его загрузка/ошибка/placement) на mobile не нужны —
        // оставляем визуальную часть айтема (id / content / beforeContent / data-test-id / …).
        const base = { ...next } as Partial<NextListItem>;
        delete base.items;
        delete base.type;
        delete base.onSublistOpenChanged;
        delete base.loading;
        delete base.dataError;
        delete base.dataFiltered;
        delete base.placement;
        delete base.scroll;
        delete base.scrollRef;

        return {
          ...(base as Item),
          afterContent: <ChevronRightSVG />,
          onClick: (event: MouseEvent<HTMLElement>) => {
            next.onClick?.(event);
            onDrill(next);
          },
        };
      }

      if (item.type === ITEM_TYPE.Group || item.type === ITEM_TYPE.GroupSelect || item.type === ITEM_TYPE.Collapse) {
        return { ...item, items: buildLevelItems(item.items, onDrill, onClose, closeOnClick) };
      }
    }

    if (closeOnClick && item && typeof item === 'object' && 'onClick' in item) {
      const baseItem = item as BaseItemProps;

      return {
        ...baseItem,
        onClick: (event: MouseEvent<HTMLElement>) => {
          baseItem.onClick?.(event);
          onClose();
        },
      };
    }

    return item;
  });
}
