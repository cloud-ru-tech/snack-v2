import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CONTENT_WRAPPER_SELECTOR, DRAWER_STORIES, OVERLAY_SELECTOR, TEST_IDS } from './helpers';

test.describe('Drawer — keyboard', () => {
  test('closes on Escape', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showAfterHeadline: false }));
    await getByTestId(TEST_IDS.drawer.triggerOpen).click();

    await expect(getByTestId(TEST_IDS.header)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.header)).not.toBeVisible();
  });

  test('Escape closes even without overlay (showBlackout=false)', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        showBlackout: false,
        showAfterHeadline: false,
      }),
    );
    await getByTestId(TEST_IDS.drawer.triggerOpen).click();

    await expect(getByTestId(TEST_IDS.header)).toBeVisible();
    // TODO(FF-8488): TEST_IDS.overlay не доходит до DOM из-за rc-drawer.
    await expect(page.locator(OVERLAY_SELECTOR)).not.toBeAttached();
    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.header)).not.toBeVisible();
  });

  test('focus trap: Tab cycles within panel', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showAfterHeadline: false, showMedia: false }));
    await getByTestId(TEST_IDS.drawer.triggerOpen).click();

    const header = getByTestId(TEST_IDS.header);
    await expect(header).toBeVisible();

    // Cycle Tab several times; focus must always remain inside the drawer panel.
    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press('Tab');
      const inside = await page.evaluate(selector => {
        const panel = document.querySelector(selector);
        const active = document.activeElement;
        return Boolean(panel && active && (panel === active || panel.contains(active)));
      }, CONTENT_WRAPPER_SELECTOR);
      expect(inside, `focus escaped on Tab #${i + 1}`).toBe(true);
    }
  });

  test('Escape returns focus to trigger', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showAfterHeadline: false, showMedia: false }));

    const trigger = getByTestId(TEST_IDS.drawer.triggerOpen);
    await trigger.focus();
    await expect(trigger).toBeFocused();
    await trigger.press('Enter');

    await expect(getByTestId(TEST_IDS.header)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.header)).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  test('modal above a drawer keeps field focus and closes first on Escape', async ({ gotoStory, page }) => {
    await gotoStory(
      buildStoryOptions(
        undefined,
        { ...DRAWER_STORIES.inModal, story: 'modal-over-drawer' },
        { layoutType: 'desktop' },
      ),
    );

    const drawerTrigger = page.getByRole('button', { name: 'Open drawer' });
    const modalTrigger = page.getByRole('button', { name: 'Open modal' });
    await drawerTrigger.press('Enter');
    await modalTrigger.press('Enter');

    const field = page.getByRole('textbox');
    await expect(field).toBeFocused();
    await page.keyboard.type('Feedback');
    await expect(field).toHaveValue('Feedback');

    await page.keyboard.press('Escape');
    await expect(field).not.toBeVisible();
    await expect(modalTrigger).toBeFocused();

    // Повторное открытие использует тот же экземпляр Modal с уже созданным порталом.
    await modalTrigger.press('Enter');
    await expect(field).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(field).not.toBeVisible();
    await expect(modalTrigger).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(modalTrigger).not.toBeVisible();
    await expect(drawerTrigger).toBeFocused();
  });

  test('Escape closes only child nested drawer, parent stays open', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showAfterHeadline: false, showMedia: false }));
    await getByTestId(TEST_IDS.drawer.triggerOpen).click();

    const parentHeader = getByTestId(TEST_IDS.header).first();
    await expect(parentHeader).toBeVisible();

    const nestedRoot = getByTestId(TEST_IDS.nestedDrawer);
    await expect(nestedRoot).not.toBeAttached();

    await getByTestId(TEST_IDS.footerAdditional).click();
    await expect(nestedRoot).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(nestedRoot).not.toBeAttached();
    await expect(parentHeader).toBeVisible();
  });
});
