import { TEST_IDS as SRC_TEST_IDS } from '../src/constants';

/** Единый объект `data-test-id` для stories и e2e. */
export const TEST_IDS = {
  cardBanner: SRC_TEST_IDS.cardBanner,
  cardService: SRC_TEST_IDS.cardService,
  cardServiceSmall: SRC_TEST_IDS.cardServiceSmall,
  cardServiceLight: SRC_TEST_IDS.cardServiceLight,
  cardServiceInfo: SRC_TEST_IDS.cardServiceInfo,
  cardSuggest: SRC_TEST_IDS.cardSuggest,
} as const;
