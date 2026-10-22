import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiFieldInput — interaction', () => {
  test('attachments row shows arrows only on overflow', async ({ page, gotoStory, getByTestId }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.attachmentsPrev)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.attachmentsNext)).toBeVisible();

    await getByTestId(TEST_IDS.attachmentsNext).click();
    await expect(getByTestId(TEST_IDS.attachmentsPrev)).toBeVisible();
  });

  test('mobile: slash is plain text, skills and connectors open as levels of the plus sheet', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory({ ...buildStoryOptions({ showAttachments: false }), globals: { layoutType: 'mobile' } });
    const editor = getByTestId(TEST_IDS.editor);
    const menuItems = getByTestId(TEST_IDS.menuItem);
    const back = getByTestId(TEST_IDS.actionListBack);

    await editor.click();
    await page.keyboard.type('/ @');
    await expect(getByTestId(TEST_IDS.actionList)).toHaveCount(0);
    await expect(editor).toHaveText('/ @');

    await getByTestId(TEST_IDS.plus).click();
    await menuItems.nth(1).click();
    await expect(back).toHaveText('Back');
    await expect(getByTestId('summarize')).toBeVisible();

    await back.click();
    await expect(menuItems).toHaveCount(3);

    await menuItems.nth(1).click();
    await getByTestId('agents').click();
    await expect(back).toHaveText('Back');
    await getByTestId('hermes').click();
    await expect(menuItems).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.chip)).toHaveCount(1);
    await expect(editor).toBeFocused();

    await getByTestId(TEST_IDS.plus).click();
    await menuItems.nth(2).click();
    await expect(back).toHaveText('Back');
    await getByTestId('team').click();
    await expect(getByTestId(TEST_IDS.chip)).toHaveCount(2);
  });
});
