import { ComponentType } from 'react';

import * as Product from '../../src/components/product';
import * as System from '../../src/components/system';
import * as Web from '../../src/components/web';

export const ICON_GROUPS = ['system', 'product', 'web'] as const;

export type IconGroup = (typeof ICON_GROUPS)[number];
export type IconSubgroupMap = Record<IconGroup, Record<string, string>>;
export type IconSubgroupOrder = Record<IconGroup, string[]>;

export type IconEntry = {
  name: string;
  baseName: string;
  Component: ComponentType<{ size?: number }>;
  group: IconGroup;
};

type IconExportKey = Extract<keyof typeof System | keyof typeof Product | keyof typeof Web, `${string}SVG`>;

export type IconName = IconExportKey extends `${infer Base}SVG` ? Base : never;

export function normalizeIconName(name: string): string {
  return name.replace(/SVG$/, '');
}
