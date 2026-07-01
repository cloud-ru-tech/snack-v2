import { Item } from './types';

/** Убирает обработчики (`on*`) перед передачей в `Droplist`: действие запускает основная кнопка, не пункт. */
export function extractDroplistItemProps(props: Item): Omit<Item, 'onClick'> {
  return Object.keys(props)
    .filter(key => !key.startsWith('on'))
    .reduce<Record<string, unknown>>((acc, key) => ({ ...acc, [key]: props[key as keyof Item] }), {}) as Omit<
    Item,
    'onClick'
  >;
}
