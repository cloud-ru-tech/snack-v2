import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Кламп значения на blur (Playground: min=0, max=99, allowMoreThanLimits=false) и подъём
// тултипа границы — надёжны только в реальном браузере: synthetic storybook-test не доводит
// native blur/setTimeout до компонента, поэтому assertions живут здесь, а не в play.
test.describe('FieldStepper — interaction (clamp on blur)', () => {
  test('clamps a value above max down to max on blur', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const input = getByTestId(TEST_IDS.fieldStepperInput);
    await input.click();
    await input.fill('150');
    await input.blur();

    // max=99 из Playground args.
    await expect(input).toHaveValue('99');
  });

  test('clamps a value below min up to min on blur', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const input = getByTestId(TEST_IDS.fieldStepperInput);
    await input.click();
    await input.fill('-5');
    await input.blur();

    // min=0 из Playground args.
    await expect(input).toHaveValue('0');
  });

  // Browser-timing-зависимый кейс: тултип границы авто-скрывается через 2с
  // (setTimeout в showClampTooltip) — это не выразить в play.
  test('the limit tooltip auto-hides 2s after the out-of-range blur', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const input = getByTestId(TEST_IDS.fieldStepperInput);
    await input.click();
    await input.fill('150');
    await input.blur();

    const tooltip = getByTestId(TEST_IDS.fieldStepperLimitTooltip);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toBeHidden({ timeout: 4000 });
  });
});
