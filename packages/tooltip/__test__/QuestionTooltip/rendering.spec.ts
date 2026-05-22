import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  QUESTION_TOOLTIP_KEY_COMBOS,
  QUESTION_TOOLTIP_STORIES,
  QUESTION_TOOLTIP_TRIGGER_LABEL,
} from './helpers';

test.describe('QuestionTooltip — rendering', () => {
  test.describe('render', () => {
    test('playground renders trigger button', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, QUESTION_TOOLTIP_STORIES.playground));
      await expect(page.getByRole('button', { name: QUESTION_TOOLTIP_TRIGGER_LABEL })).toBeVisible();
    });

    test('visual-matrix renders multiple triggers', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, QUESTION_TOOLTIP_STORIES.visualMatrix));
      await expect(page.locator('#storybook-root')).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { size, placement } of QUESTION_TOOLTIP_KEY_COMBOS) {
      test(`size=${size} placement=${placement} — trigger has data-size`, async ({ gotoStory, page }) => {
        await gotoStory(buildStoryOptions({ size, placement }, QUESTION_TOOLTIP_STORIES.playground));
        const trigger = page.getByRole('button', { name: QUESTION_TOOLTIP_TRIGGER_LABEL });
        await expect(trigger).toBeVisible();
        await expect(trigger).toHaveAttribute('data-size', size);
      });
    }
  });
});
