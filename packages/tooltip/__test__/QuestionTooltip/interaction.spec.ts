import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, QUESTION_TOOLTIP_STORIES, QUESTION_TOOLTIP_TRIGGER_LABEL, TEST_IDS } from './helpers';

test.describe('QuestionTooltip — interaction', () => {
  test('hover on icon trigger opens tooltip', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions(undefined, QUESTION_TOOLTIP_STORIES.playground));
    await page.getByRole('button', { name: QUESTION_TOOLTIP_TRIGGER_LABEL }).hover();
    await expect(getByTestId(TEST_IDS.questionTooltip.content)).toBeVisible();
  });

  test('moving mouse away hides tooltip', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions(undefined, QUESTION_TOOLTIP_STORIES.playground));
    await page.getByRole('button', { name: QUESTION_TOOLTIP_TRIGGER_LABEL }).hover();
    await expect(getByTestId(TEST_IDS.questionTooltip.content)).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(getByTestId(TEST_IDS.questionTooltip.content)).toBeHidden();
  });
});
