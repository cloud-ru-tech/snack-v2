import { Item } from '@ds/list';

import { Action } from './types';

export function hasVisibleActions(actions: Action[]) {
  return actions.some(action => !action.hidden);
}

export function getActionKey(action: Action, index: number) {
  return action.id === undefined ? `index:${index}` : `id:${action.id}`;
}

export function disableItems(items: Item[]): Item[] {
  return items.map(item => {
    if ('items' in item)
      return { ...item, items: disableItems(item.items), ...('content' in item ? { disabled: true } : {}) };
    return { ...item, disabled: true };
  });
}
