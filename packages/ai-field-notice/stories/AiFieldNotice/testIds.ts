import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  description: COMPONENT_TEST_IDS.description,
  descriptionMessage: COMPONENT_TEST_IDS.descriptionMessage,
  bannerDescription: 'ai-field-banner__description',
  bannerAction: 'ai-field-banner__action',
  bannerIcon: 'ai-field-banner__icon',
  bannerAdditional: 'ai-field-banner__additional',
  queue: COMPONENT_TEST_IDS.queue,
  banner: COMPONENT_TEST_IDS.banner,
} as const;

export function matrixCellTestId(section: string, key: string): string {
  return `${TEST_IDS.root}-${section}-${key}`;
}
