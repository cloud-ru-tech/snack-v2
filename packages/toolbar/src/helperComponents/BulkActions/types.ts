import { TooltipProps } from '@ds/tooltip';
import { WithSupportProps } from '@ds/utils';
import { JSXElementConstructor, RefObject } from 'react';

import { LayoutType } from '../../types';

export type BulkAction = WithSupportProps<{
  label: string;
  icon: JSXElementConstructor<{ className?: string }>;
  disabled?: boolean;
  tooltip?: TooltipProps['tip'];
  onClick?(): void;
}>;

export type BulkActionsProps = WithSupportProps<{
  /** Список массовых действий */
  actions?: BulkAction[];
  /** Колбек смены значения чекбокса */
  onCheck?(): void;
  /** Значение чекбокса */
  checked?: boolean;
  /** Состояние частичного выбора */
  indeterminate?: boolean;
  /** Показывать чекбокс слева (Figma: showBulkCheckbox) @default true */
  showBulkCheckbox?: boolean;
  /** Количество выбранных элементов (для подписи Selected: N) */
  selectedCount?: number;
  /** Общее количество элементов (для подписи Selected: N of M) */
  totalCount?: number;
}>;

export type BulkActionsComponentProps = BulkActionsProps & {
  layoutType?: LayoutType;
  resizingContainerRef?: RefObject<HTMLDivElement>;
};
