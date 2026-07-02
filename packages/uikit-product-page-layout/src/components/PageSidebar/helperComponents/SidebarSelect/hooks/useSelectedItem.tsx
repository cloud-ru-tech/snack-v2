import { useMemo } from 'react';

import { SidebarItem } from '../types';

type SelectedItem = {
  item: SidebarItem | undefined;
  path: (string | number)[];
};

function findSelectedItem(items: SidebarItem[], selected: string | number | undefined): SelectedItem {
  return items.reduce(
    (result, el) => {
      if (el.id === selected) {
        result.path.push(el.id);
        return { ...result, item: el };
      }

      if ('items' in el && el.items?.length) {
        const child = findSelectedItem(el.items, selected);

        if (child.item) {
          result.path.push(el.id, ...child.path);
          return { ...result, item: child.item };
        }
      }

      return result;
    },
    { item: undefined, path: [] } as SelectedItem,
  );
}

export function useSelectedItem(items: SidebarItem[], selected: string | number | undefined): SelectedItem {
  return useMemo(() => findSelectedItem(items, selected), [items, selected]);
}
