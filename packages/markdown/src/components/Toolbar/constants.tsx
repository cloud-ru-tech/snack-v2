import {
  BlockCodeSVG,
  BlockQuoteSVG,
  BoldSVG,
  BulletListSVG,
  HeadingSVG,
  ImageSVG,
  InlineCodeSVG,
  ItalicSVG,
  LinkSVG,
  OrderedListSVG,
  StrikeSVG,
  TableSVG,
} from '@ds/icons';
import { ReactNode } from 'react';

import { TOOLBAR_ITEM } from '../../constants';
import { MarkdownMessages } from '../../locale';
import { ToolbarItemId } from '../../types';

// Группировка: text-style | inline | lists | blocks | media.
export const GROUPS: ToolbarItemId[][] = [
  [TOOLBAR_ITEM.Heading, TOOLBAR_ITEM.Bold, TOOLBAR_ITEM.Italic, TOOLBAR_ITEM.Strikethrough],
  [TOOLBAR_ITEM.Link, TOOLBAR_ITEM.InlineCode, TOOLBAR_ITEM.BulletList, TOOLBAR_ITEM.OrderedList],
  [TOOLBAR_ITEM.BlockQuote, TOOLBAR_ITEM.BlockCode, TOOLBAR_ITEM.Table, TOOLBAR_ITEM.Image],
];

type ButtonSpec = {
  icon: ReactNode;
  nameKey: `toolbar.${Extract<keyof MarkdownMessages['toolbar'], string>}`;
  /** Хоткей для строки в More-списке. Только реально работающие биндинги TipTap. */
  hotkey?: string;
};

export const BUTTONS: Record<ToolbarItemId, ButtonSpec> = {
  [TOOLBAR_ITEM.Heading]: { icon: <HeadingSVG />, nameKey: 'toolbar.heading' },
  [TOOLBAR_ITEM.Bold]: { icon: <BoldSVG />, nameKey: 'toolbar.bold', hotkey: 'Ctrl+B' },
  [TOOLBAR_ITEM.Italic]: { icon: <ItalicSVG />, nameKey: 'toolbar.italic', hotkey: 'Ctrl+I' },
  [TOOLBAR_ITEM.Strikethrough]: { icon: <StrikeSVG />, nameKey: 'toolbar.strikethrough', hotkey: 'Ctrl+Shift+X' },
  [TOOLBAR_ITEM.Link]: { icon: <LinkSVG />, nameKey: 'toolbar.link', hotkey: 'Ctrl+K' },
  [TOOLBAR_ITEM.Image]: { icon: <ImageSVG />, nameKey: 'toolbar.image', hotkey: 'Ctrl+Shift+I' },
  [TOOLBAR_ITEM.Table]: { icon: <TableSVG />, nameKey: 'toolbar.table' },
  [TOOLBAR_ITEM.InlineCode]: { icon: <InlineCodeSVG />, nameKey: 'toolbar.inlineCode', hotkey: 'Ctrl+E' },
  [TOOLBAR_ITEM.BulletList]: { icon: <BulletListSVG />, nameKey: 'toolbar.bulletList', hotkey: 'Ctrl+Shift+8' },
  [TOOLBAR_ITEM.OrderedList]: { icon: <OrderedListSVG />, nameKey: 'toolbar.orderedList', hotkey: 'Ctrl+Shift+7' },
  [TOOLBAR_ITEM.BlockQuote]: { icon: <BlockQuoteSVG />, nameKey: 'toolbar.blockQuote', hotkey: 'Ctrl+Shift+B' },
  [TOOLBAR_ITEM.BlockCode]: { icon: <BlockCodeSVG />, nameKey: 'toolbar.blockCode', hotkey: 'Ctrl+Alt+C' },
};

export const DEFAULT_TOOLBAR: ToolbarItemId[] = [
  TOOLBAR_ITEM.Heading,
  TOOLBAR_ITEM.Bold,
  TOOLBAR_ITEM.Italic,
  TOOLBAR_ITEM.Strikethrough,
  TOOLBAR_ITEM.Link,
  TOOLBAR_ITEM.InlineCode,
  TOOLBAR_ITEM.BulletList,
  TOOLBAR_ITEM.OrderedList,
  TOOLBAR_ITEM.BlockQuote,
  TOOLBAR_ITEM.BlockCode,
  TOOLBAR_ITEM.Table,
  TOOLBAR_ITEM.Image,
];
