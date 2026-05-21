import { TEST_IDS as COMPONENT_TEST_IDS } from '@ds/ai-card';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  title: COMPONENT_TEST_IDS.title,
  content: COMPONENT_TEST_IDS.content,
  disabled: `${COMPONENT_TEST_IDS.root}-disabled`,
} as const;
