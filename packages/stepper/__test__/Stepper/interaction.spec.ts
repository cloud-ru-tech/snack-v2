import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, STEPPER_STORIES, TEST_IDS } from './helpers';

const STEP_BUTTON_TEST_ID = `${TEST_IDS.root}_element-step`;

test.describe('Stepper — interaction', () => {
  test('free navigation toggles clickability for non-adjacent steps', async ({ gotoStory, page }) => {
    // Playground держит детерминированный старт (defaultCurrentStepIndex=0, play
    // только проверяет видимость); InteractionTest мутирует состояние своим play.
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.playground));

    const stepButtons = page.getByTestId(STEP_BUTTON_TEST_ID);
    // Без free navigation текущий шаг (0) сам не кликабелен, кликабелен только
    // соседний следующий (1); несоседний шаг (2) остаётся disabled.
    await expect(stepButtons.nth(0)).toBeDisabled();
    await expect(stepButtons.nth(1)).toBeEnabled();
    await expect(stepButtons.nth(2)).toBeDisabled();

    await gotoStory(buildStoryOptions({ allowFreeNavigation: true }, STEPPER_STORIES.playground));

    await expect(stepButtons.nth(0)).toBeEnabled();
    await expect(stepButtons.nth(1)).toBeEnabled();
    await expect(stepButtons.nth(2)).toBeEnabled();

    await stepButtons.nth(2).click();

    await expect(stepButtons.nth(0)).toHaveAttribute('data-state', 'completed');
    await expect(stepButtons.nth(1)).toHaveAttribute('data-state', 'completed');
    await expect(stepButtons.nth(2)).toHaveAttribute('data-state', 'current');
  });
});
