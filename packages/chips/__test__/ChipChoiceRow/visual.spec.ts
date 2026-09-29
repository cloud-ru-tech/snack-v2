import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { CHIP_CHOICE_ROW_TEST_IDS } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';
import { buildChipChoiceRowStory, CHIP_STORIES, KEY_SIZES } from '../_shared/helpers';

test.describe('ChipChoiceRow — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix includes wrapping chips, divider, add and clear buttons', async ({
    page,
    gotoStory,
    waitForFonts,
    getByTestId,
  }) => {
    await gotoStory(buildChipChoiceRowStory(undefined, CHIP_STORIES.visualMatrix));
    await waitForFonts();

    for (const size of KEY_SIZES) {
      for (const scenario of ['chipWrapping', 'dividerWrapping'] as const) {
        const row = getByTestId(`${TEST_IDS.chipChoiceRow[scenario]}-${size}`);
        const pinned = await row.getByTestId(TEST_IDS.chipChoiceRow.pinnedWrappingFilter).boundingBox();
        const filter = await row.getByTestId(TEST_IDS.chipChoiceRow.wrappingFilter).boundingBox();
        const divider = await row.getByTestId(CHIP_CHOICE_ROW_TEST_IDS.divider).boundingBox();

        if (!pinned || !filter || !divider) {
          throw new Error(`Missing wrapping elements for ${scenario}, size=${size}`);
        }

        if (scenario === 'chipWrapping') {
          expect(divider.y).toBeCloseTo(pinned.y, 0);
          expect(filter.y).toBeGreaterThanOrEqual(pinned.y + pinned.height);
        } else {
          expect(divider.y).toBeGreaterThanOrEqual(pinned.y + pinned.height);
          expect(filter.y + filter.height / 2).toBeCloseTo(divider.y + divider.height / 2, 0);
        }
      }
      for (const scenario of ['clearButtonWrapping', 'bothButtonsWrapping'] as const) {
        const row = getByTestId(`${TEST_IDS.chipChoiceRow[scenario]}-${size}`);
        const filter = await row.getByTestId(TEST_IDS.chipChoiceRow.wrappingFilter).boundingBox();
        const addButton = await row.getByTestId(CHIP_CHOICE_ROW_TEST_IDS.addButton).boundingBox();
        const clearButton = await row.getByTestId(CHIP_CHOICE_ROW_TEST_IDS.clearButton).boundingBox();

        expect(filter).not.toBeNull();
        expect(addButton).not.toBeNull();
        expect(clearButton).not.toBeNull();

        if (!filter || !addButton || !clearButton) {
          throw new Error(`Missing wrapping elements for ${scenario}, size=${size}`);
        }

        if (scenario === 'clearButtonWrapping') {
          expect(addButton.y + addButton.height / 2).toBeCloseTo(filter.y + filter.height / 2, 0);
        } else {
          expect(addButton.y).toBeGreaterThanOrEqual(filter.y + filter.height);
        }
        expect(clearButton.y).toBeGreaterThanOrEqual(addButton.y + addButton.height);
      }
    }
    await assertVisualMatrixSnapshot(page);
  });
});
