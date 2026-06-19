import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  ...COMPONENT_TEST_IDS,
  promoTagHover: 'promo-tag-predefined__promo-tag-hover',
  promoTagClickTrigger: 'promo-tag-predefined__promo-tag-click-trigger',
  promoTagOnClick: 'promo-tag-predefined__promo-tag-on-click',
} as const;
