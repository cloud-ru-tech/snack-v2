import { expect, test } from '#playwright-tooling/fixtures';

import { MODE } from '../../src/constants';
import { buildStoryOptions, MODAL_TRIGGER_TEST_ID, TEST_IDS } from './helpers';

const M = TEST_IDS.modal;

test.describe('Modal — keyboard', () => {
  test('Escape closes Regular modal', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: MODE.Regular }));
    await getByTestId(MODAL_TRIGGER_TEST_ID).click();

    await expect(getByTestId(M.root)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(getByTestId(M.root)).not.toBeVisible();
  });

  test('Escape returns focus to trigger button after open via click', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: MODE.Regular }));

    const trigger = getByTestId(MODAL_TRIGGER_TEST_ID);
    await trigger.click();
    await expect(getByTestId(M.root)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(getByTestId(M.root)).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  test('Escape does NOT close Forced modal', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: MODE.Forced }));
    await getByTestId(MODAL_TRIGGER_TEST_ID).click();

    await expect(getByTestId(M.root)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(getByTestId(M.root)).toBeVisible();
  });

  test('focus trap cycles footer buttons and close, restores focus after Escape', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(
      buildStoryOptions({
        mode: MODE.Regular,
        showBackButton: false,
        showAfterHeadline: false,
        showMedia: false,
        showFooter: true,
        title: 'Title',
        subtitle: '',
        content: '',
      }),
    );

    const toggle = getByTestId(MODAL_TRIGGER_TEST_ID);
    const firstButton = getByTestId(M.footerApprove);
    const secondButton = getByTestId(M.footerCancel);
    const closeBtn = getByTestId(M.closeButton);
    const dialog = getByTestId(M.root);

    await toggle.click();
    await expect(dialog).toBeVisible();
    await expect(dialog).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(secondButton).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(firstButton).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(closeBtn).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(secondButton).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(closeBtn).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(toggle).toBeFocused();
  });
});
