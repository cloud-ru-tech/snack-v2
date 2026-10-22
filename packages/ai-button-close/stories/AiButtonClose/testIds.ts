import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  disabled: `${COMPONENT_TEST_IDS.root}-disabled`,
} as const;
