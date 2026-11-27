import { BlockProps } from '@ds/block';
import { Action } from '@ds/uikit-product-actions';
import { ReactNode } from 'react';

export type BlockPredefinedSimpleProps = Pick<BlockProps, 'className' | 'data-test-id'> & {
  /** Заголовок секции. Переносится на несколько строк без обрезания. */
  title?: string;
  /** Содержимое под шапкой. */
  children?: ReactNode;
  /** Действия в порядке приоритета. При нехватке ширины скрываются в меню, начиная с конца. */
  actions?: Action[];
  /** Только mobile: максимальное число действий в строке. @default 1 */
  maxVisibleActionsItems?: number;
};
