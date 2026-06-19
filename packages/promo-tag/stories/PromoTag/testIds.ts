import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  ...COMPONENT_TEST_IDS,
  beforeNode: 'before-node',
  afterNode: 'after-node',
  polymorphicAnchor: 'promo-tag__polymorphic-anchor',
  polymorphicAnchorClick: 'promo-tag__polymorphic-anchor-click',
  polymorphicLink: 'promo-tag__polymorphic-link',
} as const;
