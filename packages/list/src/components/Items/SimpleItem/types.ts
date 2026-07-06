import { SeparatorProps } from '../../../helperComponents';

/** Поля заголовка группы, общие для сортируемого блока и его копии в `DragOverlay`. */
export type GroupHeaderContent = Pick<
  SeparatorProps,
  'label' | 'beforeContent' | 'truncate' | 'divider' | 'groupVariant'
>;
