import { Button } from '@ds/button';
import { QuestionTooltipProps, TooltipProps } from '@ds/tooltip';
import { WithSupportProps } from '@ds/utils';
import { ComponentProps, ReactNode } from 'react';

import { Position } from '../../types';

type ButtonProps = ComponentProps<typeof Button>;

export type MobileRowActionButton = {
  tip?: Pick<TooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'> | string;
} & Omit<ButtonProps, 'size' | 'appearance' | 'view'>;

export type MobileRowActionsPair = {
  first: MobileRowActionButton;
  second?: MobileRowActionButton;
};

export type MobileInfoRowPropsBase = {
  position?: Position;
  label: string;
  /** Если > 0 — обрезка через `TruncateString` (в legacy мобильного пакета не было; опционально для паритета с десктопом). */
  labelTruncate?: number;
  labelTooltip?:
    | Pick<QuestionTooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'>
    | string;
  topDivider?: boolean;
  bottomDivider?: boolean;
  className?: string;
  content?: ReactNode;
  rowActions?: MobileRowActionsPair;
  loading?: boolean;
};

export type MobileInfoRowProps = WithSupportProps<MobileInfoRowPropsBase>;
