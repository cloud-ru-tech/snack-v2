import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  content: COMPONENT_TEST_IDS.content,
  contentMessage: COMPONENT_TEST_IDS.contentMessage,
  bannerContent: 'ai-field-banner__content',
  bannerAction: 'ai-field-banner__action',
  bannerIcon: 'ai-field-banner__icon',
  bannerAdditional: 'ai-field-banner__additional',
  queue: COMPONENT_TEST_IDS.queue,
  banner: COMPONENT_TEST_IDS.banner,
} as const;

export function matrixCellTestId(section: string, key: string): string {
  return `${TEST_IDS.root}-${section}-${key}`;
}
