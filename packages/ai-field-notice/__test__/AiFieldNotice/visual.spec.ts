import { STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  waitForStableRender,
} from '#playwright-tooling/utils';

import {
  AI_FIELD_NOTICE_STORIES,
  buildStoryOptions,
  DESCRIPTION_HOVER_SETTLE_MS,
  DESCRIPTION_ROTATION_SETTLE_MS,
  TEST_IDS,
} from './helpers';

test.describe('AiFieldNotice — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix — scenario × size', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_NOTICE_STORIES.visualMatrixScenarioSize));
    await waitForFonts();
    // Описание баннеров прокручивает пункты JS-таймером, bbox при этом неподвижен:
    // без ожидания покоя матрица снимается на произвольном кадре прокрутки.
    await waitForStableRender(page.locator(STORYBOOK_ROOT_SELECTOR), {
      stableForMs: DESCRIPTION_ROTATION_SETTLE_MS,
    });
    await assertVisualMatrixSnapshot(page, 'visual-matrix-scenario-size.png');
  });

  test('action interaction states (default × hover × focus × pressed)', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_NOTICE_STORIES.interactionTest));
    await waitForFonts();

    const root = page.getByTestId(TEST_IDS.banner);
    const action = page.getByTestId(TEST_IDS.bannerAction);
    const description = page.getByTestId(TEST_IDS.description);
    await expect(root).toBeVisible();
    await expect(action).toBeVisible();

    await waitForStableRender(description, { stableForMs: DESCRIPTION_ROTATION_SETTLE_MS });

    await assertInteractionStatesSnapshot(page, {
      target: root,
      hoverTarget: action,
      pressedTarget: action,
      includePressed: true,
      focusAction: async () => {
        await action.focus();
      },
      // Hover приходится на action внутри баннера — описание уезжает на hover-пункт
      // с задержкой. Без ожидания ячейка ловит середину перехода.
      settle: () => waitForStableRender(description, { stableForMs: DESCRIPTION_HOVER_SETTLE_MS }),
    });
  });
});
