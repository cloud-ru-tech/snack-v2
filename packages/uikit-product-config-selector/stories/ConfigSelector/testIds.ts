import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

/**
 * Component-анатомия (`root` / `input` / `label`) плюс story-scoped id'ы для
 * сценария «доступная опция с tooltip»: `availableRoot` — chip для hover'а,
 * `availableTip` — span внутри `availableTip`, делающий content портала адресуемым
 * (data-test-id через args осел бы на floating div — см. test-environment-pitfalls).
 */
export const TEST_IDS = {
  ...COMPONENT_TEST_IDS,
  availableRoot: 'config-selector-available',
  availableTip: 'config-selector-available__tip',
} as const;
