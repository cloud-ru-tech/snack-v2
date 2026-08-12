import { DroplistProps } from '@ds/list';

import { PlatformLogo, VARIANT, type Variant } from '../../../../src';

export const PLATFORM_GROUP = {
  cloudPlatforms: 'Облачные платформы',
  otherProducts: 'Другие продукты',
} as const;

export type PlatformOption = {
  id: string;
  label: string;
  description: string;
  variant: Variant;
};

/** Опции селектора платформ (как ProductSelect / useProductSelectItems в cp/header). */
export const PLATFORM_OPTIONS: PlatformOption[] = [
  {
    id: 'evolution',
    label: 'Evolution',
    description: PLATFORM_GROUP.cloudPlatforms,
    variant: VARIANT.Evolution,
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: PLATFORM_GROUP.cloudPlatforms,
    variant: VARIANT.Advanced,
  },
  {
    id: 'vmware',
    label: 'Облако VMware',
    description: PLATFORM_GROUP.cloudPlatforms,
    variant: VARIANT.Vmware,
  },
  {
    id: 'partners',
    label: 'Партнерский кабинет',
    description: PLATFORM_GROUP.otherProducts,
    variant: VARIANT.Partner,
  },
  {
    id: 'marketplace',
    label: 'Маркетплейс',
    description: PLATFORM_GROUP.otherProducts,
    variant: VARIANT.Marketplace,
  },
];

export const PLATFORM_OPTIONS_BY_ID = Object.fromEntries(PLATFORM_OPTIONS.map(option => [option.id, option])) as Record<
  string,
  PlatformOption
>;

export const PLATFORM_SELECTOR_ITEMS: DroplistProps['items'] = [
  {
    type: 'group',
    label: PLATFORM_GROUP.cloudPlatforms,
    items: PLATFORM_OPTIONS.filter(option => option.description === PLATFORM_GROUP.cloudPlatforms).map(option => ({
      id: option.id,
      content: { label: option.label },
      beforeContent: <PlatformLogo variant={option.variant} compact />,
    })),
  },
  {
    type: 'group',
    label: PLATFORM_GROUP.otherProducts,
    items: PLATFORM_OPTIONS.filter(option => option.description === PLATFORM_GROUP.otherProducts).map(option => ({
      id: option.id,
      content: { label: option.label },
      beforeContent: <PlatformLogo variant={option.variant} compact />,
    })),
  },
];

export const DEFAULT_PLATFORM_OPTION = PLATFORM_OPTIONS_BY_ID.evolution;
