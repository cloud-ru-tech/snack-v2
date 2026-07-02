import { useMemo } from 'react';

import { SidebarItem } from '../types';

const matchString = (value: string, searchValue: string) =>
  value.trim().toLowerCase().includes(searchValue.trim().toLowerCase());

const filterService = (servicesList: SidebarItem[], searchValue: string): SidebarItem[] => {
  if (!searchValue) return servicesList;

  return servicesList.reduce((result, service) => {
    if (service.label && matchString(service.label, searchValue)) {
      result.push(service);
      return result;
    }

    if ('items' in service && service.items?.length) {
      const items = filterService(service.items, searchValue);

      if (items.length) {
        result.push({ ...service, items });
      }

      return result;
    }

    return result;
  }, [] as SidebarItem[]);
};

const getItemIds = (list: SidebarItem[]): (string | number)[] =>
  list.reduce(
    (result, el) => {
      result.push(el.id);

      if ('items' in el && el.items?.length) {
        const childItems = getItemIds(el.items);
        result.push(...childItems);
      }
      return result;
    },
    [] as (string | number)[],
  );

export const useSearchFilter = (list: SidebarItem[], searchValue: string) => {
  const filteredList = useMemo(() => filterService(list, searchValue), [list, searchValue]);
  const searchCollapseState = useMemo(() => ({ value: getItemIds(filteredList) }), [filteredList]);

  return {
    filteredList,
    searchCollapseState,
  };
};
