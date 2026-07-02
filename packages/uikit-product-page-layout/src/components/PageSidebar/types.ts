import { IconPredefinedProps } from '@ds/icon-predefined';
import { TooltipProps } from '@ds/tooltip';
import { AnchorHTMLAttributes, MouseEvent, MouseEventHandler, ReactNode } from 'react';

import { SIDEBAR_HEADER_TYPE } from '../../constants';
import { SidebarItemType } from '../../types';

export type SidebarItemBase = {
  id: string | number;
  label: string;
  'data-test-id'?: string;
  onClick?(e: MouseEvent<HTMLElement>): void;
  afterContent?: ReactNode;
  disabledReason?: ReactNode;
  disabledReasonPlacement?: TooltipProps['placement'];
  beforeContent?: ReactNode;
};

export type SidebarItemWithHref = SidebarItemBase & {
  href: string;
};

export type SidebarItemWithItems = SidebarItemBase & {
  /** @default collapse */
  type?: SidebarItemType;
  divider?: boolean;
  items?: SidebarItem[];
};

export type SidebarItem = SidebarItemWithHref | SidebarItemWithItems;

export type Icon = IconPredefinedProps['icon'];

export type HeaderProps =
  | { type: typeof SIDEBAR_HEADER_TYPE.Title; label: string; icon: Icon; afterContent?: ReactNode }
  | { type: typeof SIDEBAR_HEADER_TYPE.Back; label: string; href?: string; onClick?: MouseEventHandler };

export type Documentation = {
  href?: string;
  onClick?: MouseEventHandler;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
};
