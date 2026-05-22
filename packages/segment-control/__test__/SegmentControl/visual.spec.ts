import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, SEGMENT_CONTROL_STORIES, segmentTestId, TEST_IDS } from './helpers';

test.describe('SegmentControl — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, SEGMENT_CONTROL_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus × pressed)', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    // Снимаем root (всю segment-control), чтобы было видно контекст — но
    // hover/focus/pressed целимся во второй (невыбранный) сегмент: на первом state-фоны
    // и focus-ring скрыты выбранным состоянием.
    const secondSegment = getByTestId(segmentTestId('analytics'));
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.root),
      hoverTarget: secondSegment,
      pressedTarget: secondSegment,
      includePressed: true,
      focusAction: async p => {
        await p.keyboard.press('Tab');
        await p.keyboard.press('ArrowRight');
      },
      layout: 'col',
    });
  });
});
