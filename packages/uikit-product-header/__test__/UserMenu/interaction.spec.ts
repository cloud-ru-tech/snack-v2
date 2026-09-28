import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../stories/testIds';
import { buildUserMenuStoryOptions } from './helpers';

const TRIGGER_TOOLTIP = 'User menu tooltip';

test.describe('UserMenu — interaction', () => {
  test('closes on Escape while trigger tooltip is shown', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildUserMenuStoryOptions({ triggerTooltip: TRIGGER_TOOLTIP }));

    // Курсор остаётся над триггером — дожидаемся тултипа, который гасил Esc
    await getByTestId(TEST_IDS.userMenu.button).click();
    await expect(getByTestId(TEST_IDS.userMenu.root)).toBeVisible();
    await expect(page.getByText(TRIGGER_TOOLTIP)).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(getByTestId(TEST_IDS.userMenu.root)).toBeHidden();
  });
});
