import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  composeScreenshots,
  ScreenshotCell,
  screenshotRegion,
} from '#playwright-tooling/utils';

import { buildStoryOptions, FIELD_TEXT_STORIES, STORY_TEST_IDS, TEST_IDS } from './helpers';

test.describe('FieldText — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_TEXT_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Hover навешиваем на input — mouseenter всплывает на fieldWrapper (acrylic + focus-glow).
  test('field interaction states', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.fieldText),
      hoverTarget: getByTestId(TEST_IDS.fieldTextInput),
      // уникальное имя — рядом отдельный element-button snapshot
      snapshotName: 'field-interaction-states.png',
    });
  });

  test('element-button interaction states', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_TEXT_STORIES.elementButtonStates));
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.fieldTextElementButton),
      includePressed: true,
    });
  });

  // Открытый встроенный Droplist — портальный overlay, в VisualMatrix не собирается.
  // Composite before/after: фиксирует statelayer buttonField (заливка до рамки поля,
  // скругление внешнего угла) в открытом (pressed) состоянии для обоих вариантов.
  test('open-droplist (before × after)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_TEXT_STORIES.withDroplist));
    await waitForFonts();

    const cells: ScreenshotCell[] = [];
    for (const variant of ['before', 'after'] as const) {
      const root = getByTestId(STORY_TEST_IDS.fieldText[`droplist${variant === 'before' ? 'Before' : 'After'}Root`]);
      const button = getByTestId(
        STORY_TEST_IDS.fieldText[`droplist${variant === 'before' ? 'Before' : 'After'}Button`],
      );
      await button.click();
      const firstItem = getByTestId(`${STORY_TEST_IDS.fieldText.droplistItem}-1`);
      const lastItem = getByTestId(`${STORY_TEST_IDS.fieldText.droplistItem}-3`);
      await expect(firstItem).toBeVisible();
      cells.push({
        label: variant,
        png: await screenshotRegion(page, [root, lastItem], 16, SCREENSHOT_DEFAULT_OPTS),
      });
      // закрываем перед следующей итерацией
      await page.keyboard.press('Escape');
      await expect(firstItem).not.toBeVisible();
    }

    const composite = await composeScreenshots(cells, { layout: 'row' });
    expect(composite).toMatchSnapshot('open-droplist.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
