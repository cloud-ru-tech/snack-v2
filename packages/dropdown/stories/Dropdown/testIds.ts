import { TEST_IDS as PUBLIC_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: PUBLIC_TEST_IDS.root,
  triggerOpen: PUBLIC_TEST_IDS.trigger,
  content: 'dropdown-content',
  item: 'dropdown-item',
} as const;
