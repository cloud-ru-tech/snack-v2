import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  screenshotWithPadding,
  waitForSettledInViewport,
} from '#playwright-tooling/utils';

import { buildStoryOptions, COLLAPSE_BLOCK_PRIMARY_STORIES, PLAYGROUND_DEFAULT_ARGS, TEST_IDS } from './helpers';

test.describe('CollapseBlockPrimary — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, COLLAPSE_BLOCK_PRIMARY_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus) — title', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));
    await waitForFonts();

    // Hover на title (row-подсветка); focus по Tab уходит на chevron-кнопку
    // (единственный focusable внутри блока). Title сам не focusable.
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.collapseBlock),
      hoverTarget: getByTestId(TEST_IDS.title),
      layout: 'col',
    });
  });

  // expanded — отдельный сценарий: prop-driven state, который VM не покрывает
  // (VM рендерит только collapsed-вариант). Не объединяется с interaction-states.
  test('expanded', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, children: 'Visible content' }));
    await waitForFonts();

    await getByTestId(TEST_IDS.title).click();
    await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-expanded', 'true');
    // Ждём флаг завершения раскрытия: он же снимает `overflow: hidden` с тела, поэтому снимок
    // берётся уже в финальном состоянии.
    await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-completely-open', 'true');
    // Ждём стабилизации bbox: после animation finished Chromium может ещё один
    // frame округлять высоту к +1/-1px (subpixel-rounding на конце slide-open).
    await waitForSettledInViewport(getByTestId(TEST_IDS.collapseBlock));

    const png = await screenshotWithPadding(page, getByTestId(TEST_IDS.collapseBlock), 16, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('expanded.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
