import { ItemRenderProps, Mode } from '@ds/list';

/**
 * Пропы оболочки. Совместимы с `ItemRenderProps` списка (адаптер — spread).
 * Для Playground часть полей опциональна: `contentNode` / `selectionMode` / `size` / `tabIndex` / `level`.
 */
export type ListItemCustomProps = Omit<
  ItemRenderProps,
  'contentNode' | 'selectionMode' | 'size' | 'tabIndex' | 'level'
> & {
  contentNode?: ItemRenderProps['contentNode'];
  selectionMode?: Mode;
  size?: ItemRenderProps['size'];
  tabIndex?: number;
  level?: number;
};
