import { MATCH_SNAPSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { screenshotRegion } from '#playwright-tooling/utils';

import { buildStoryOptions, QUESTION_TOOLTIP_STORIES, TEST_IDS } from './helpers';

test.describe('QuestionTooltip — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // QuestionTooltip — портал, hover-driven. Закрытое состояние и ось `size` триггера
  // покрываются VisualMatrix. Здесь — один open-снимок панели + триггера в кадре.

  test('open (after hover)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, QUESTION_TOOLTIP_STORIES.playground));
    await waitForFonts();
    const trigger = getByTestId(TEST_IDS.questionTooltip.triggerOpen);
    await trigger.hover();
    const content = getByTestId(TEST_IDS.questionTooltip.content);
    await expect(content).toBeVisible();
    const png = await screenshotRegion(page, [trigger, content], 24);
    expect(png).toMatchSnapshot('open.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
