import type { ComponentType } from 'react';

import * as AllIcons from '../../src';
import { ProductIcons, WebIcons } from '../../src';

export const ICON_GROUPS = ['snack-icons', 'product-icons', 'web-icons'] as const;
export const ICON_VARIANTS = ['sprite', 'standalone'] as const;

export type IconGroup = (typeof ICON_GROUPS)[number];
export type IconVariant = (typeof ICON_VARIANTS)[number];
export type IconSubgroupMap = Record<IconGroup, Record<string, string>>;
export type IconSubgroupOrder = Record<IconGroup, string[]>;

export type IconEntry = {
  name: string;
  baseName: string;
  Component: ComponentType<{ size?: number }>;
  group: IconGroup;
};

export const SKIP_KEYS = new Set([
  'Sprite',
  'SpriteSVG',
  'SpriteSnackIconsSVG',
  'SpriteProductIconsSVG',
  'SpriteWebIconsSVG',
  'ProductIcons',
  'WebIcons',
]);

type IconExportKey = Extract<
  keyof typeof AllIcons | keyof typeof ProductIcons | keyof typeof WebIcons,
  `${string}SpriteSVG` | `${string}SVG`
>;

type StripIconSuffix<T extends string> = T extends `${infer Base}SpriteSVG`
  ? Base
  : T extends `${infer Base}SVG`
    ? Base
    : never;

export type IconName = StripIconSuffix<IconExportKey>;

export function normalizeIconName(name: string): string {
  return name.replace(/SpriteSVG$/, '').replace(/SVG$/, '');
}
