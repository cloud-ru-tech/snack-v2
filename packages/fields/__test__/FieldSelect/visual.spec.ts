import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  screenshotRegion,
} from '#playwright-tooling/utils';

import {
  buildStoryOptions,
  FIELD_SELECT_STORIES,
  LIST_BASE_ITEM_TEST_ID,
  LIST_LOADER_TEST_ID,
  LIST_NO_DATA_TEST_ID,
  TEST_IDS,
} from './helpers';

// По одному снимку на портальный @ds/list сценарий (nesting + async). contentTestId — узел,
// который должен попасть в кадр вместе с триггером (последний item / loader / empty-state).
const OPEN_SCENARIOS = [
  { ref: FIELD_SELECT_STORIES.openGrouped, snapshot: 'open-grouped.png', contentTestId: LIST_BASE_ITEM_TEST_ID },
  {
    ref: FIELD_SELECT_STORIES.openGroupSelect,
    snapshot: 'open-group-select.png',
    contentTestId: LIST_BASE_ITEM_TEST_ID,
  },
  { ref: FIELD_SELECT_STORIES.openNested, snapshot: 'open-nested.png', contentTestId: LIST_BASE_ITEM_TEST_ID },
  { ref: FIELD_SELECT_STORIES.openAccordion, snapshot: 'open-accordion.png', contentTestId: LIST_BASE_ITEM_TEST_ID },
  { ref: FIELD_SELECT_STORIES.openPinned, snapshot: 'open-pinned.png', contentTestId: LIST_BASE_ITEM_TEST_ID },
  { ref: FIELD_SELECT_STORIES.openLoading, snapshot: 'open-loading.png', contentTestId: LIST_LOADER_TEST_ID },
  { ref: FIELD_SELECT_STORIES.openEmpty, snapshot: 'open-empty.png', contentTestId: LIST_NO_DATA_TEST_ID },
] as const;

test.describe('FieldSelect — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_SELECT_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Закрытый триггер: hover/focus дают focus-glow + acrylic, которые VisualMatrix (статика) не показывает.
  // Hover на input — mouseenter всплывает на fieldWrapper-триггер.
  test('interaction states (closed trigger default × hover × focus)', async ({
    page,
    gotoStory,
    waitForFonts,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.fieldSelect),
      hoverTarget: getByTestId(TEST_IDS.fieldSelectInput),
    });
  });

  // Открытый Droplist — портальный overlay, в VisualMatrix не собирается: отдельный снимок триггера + контента.
  test('open-droplist', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_SELECT_STORIES.open));
    await waitForFonts();
    const trigger = getByTestId(TEST_IDS.fieldSelect);
    const items = page.getByTestId(new RegExp(`^${LIST_BASE_ITEM_TEST_ID}`));
    await expect(items.first()).toBeVisible();
    const png = await screenshotRegion(page, [trigger, items.last()], 16, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('open-droplist.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  for (const { ref, snapshot, contentTestId } of OPEN_SCENARIOS) {
    test(snapshot.replace('.png', ''), async ({ page, gotoStory, getByTestId, waitForFonts }) => {
      await gotoStory(buildStoryOptions(undefined, ref));
      await waitForFonts();
      const trigger = getByTestId(TEST_IDS.fieldSelect);
      const content = page.getByTestId(new RegExp(`^${contentTestId}`));
      await expect(content.first()).toBeVisible();
      const png = await screenshotRegion(page, [trigger, content.last()], 16, SCREENSHOT_DEFAULT_OPTS);
      expect(png).toMatchSnapshot(snapshot, MATCH_SNAPSHOT_DEFAULT_OPTS);
    });
  }
});
