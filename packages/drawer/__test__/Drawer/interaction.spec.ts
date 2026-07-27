import { expect, test } from '#playwright-tooling/fixtures';
import { dataTestIdSelector } from '#playwright-tooling/utils';

import { NESTED_DRAWER_BODY, NESTED_DRAWER_TITLE } from '../../stories/Drawer/constants';
import { buildStoryOptions, OVERLAY_SELECTOR, TEST_IDS } from './helpers';

const CHROME_VIEWPORT = { width: 1200, height: 871 };

test.describe('Drawer — interaction', () => {
  test('opens via trigger button from closed state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        showAfterHeadline: false,
        showMedia: false,
      }),
    );

    await expect(getByTestId(TEST_IDS.header)).not.toBeAttached();
    await getByTestId(TEST_IDS.drawer.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.header)).toBeVisible();
  });

  test('closes on overlay click', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showAfterHeadline: false }));
    await getByTestId(TEST_IDS.drawer.triggerOpen).click();

    await expect(getByTestId(TEST_IDS.header)).toBeVisible();
    // TODO(FF-8488): TEST_IDS.overlay не доходит до DOM из-за rc-drawer.
    await page.locator(OVERLAY_SELECTOR).click();
    await expect(getByTestId(TEST_IDS.header)).not.toBeVisible();
  });

  test('closes on close button click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showAfterHeadline: false }));
    await getByTestId(TEST_IDS.drawer.triggerOpen).click();

    await expect(getByTestId(TEST_IDS.header)).toBeVisible();
    await getByTestId(TEST_IDS.closeButton).click();
    await expect(getByTestId(TEST_IDS.header)).not.toBeVisible();
  });

  test('short body content does NOT cause vertical scroll', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        content: 'Short',
        longBodyContent: false,
        showMedia: false,
        showAfterHeadline: false,
      }),
    );
    await getByTestId(TEST_IDS.drawer.triggerOpen).click();

    const body = getByTestId(TEST_IDS.body);
    await expect(body).toBeVisible();

    const viewport = body.locator('[data-overlayscrollbars-viewport]');
    const target = (await viewport.count()) > 0 ? viewport : body;

    await page.mouse.wheel(0, 1000);
    const scrollTop = await target.first().evaluate(el => el.scrollTop);
    expect(scrollTop).toBe(0);
  });

  test('scrolls long body content', async ({ gotoStory, page, getByTestId }) => {
    const originalViewport = page.viewportSize() ?? CHROME_VIEWPORT;
    await page.setViewportSize({ width: 900, height: 480 });
    try {
      await gotoStory(
        buildStoryOptions({
          longBodyContent: true,
          showAfterHeadline: false,
          showMedia: false,
        }),
      );
      await getByTestId(TEST_IDS.drawer.triggerOpen).click();

      const body = getByTestId(TEST_IDS.body);
      await expect(body).toContainText('Lorem', { timeout: 15000 });

      const viewport = body.locator('[data-overlayscrollbars-viewport]');
      const content = body.locator('[data-overlayscrollbars-content]');

      const scrollTarget = await (async () => {
        for (const candidate of [viewport, content, body]) {
          const scrollable = await candidate.evaluate(el => el.scrollHeight > el.clientHeight).catch(() => false);
          if (scrollable) return candidate;
        }
        return viewport;
      })();

      await scrollTarget.evaluate(el => el.scrollBy({ top: 120, behavior: 'auto' }));
      const scrollTop = await scrollTarget.evaluate(el => el.scrollTop);
      expect(scrollTop).not.toBe(0);
    } finally {
      await page.setViewportSize(originalViewport);
    }
  });

  test('opens nested drawer and closes it while parent stays open', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showAfterHeadline: false }));
    await getByTestId(TEST_IDS.drawer.triggerOpen).click();

    const nestedRoot = getByTestId(TEST_IDS.nestedDrawer);
    await expect(nestedRoot).not.toBeAttached();

    await getByTestId(TEST_IDS.footerAdditional).click();
    await expect(nestedRoot).toBeVisible();
    await expect(nestedRoot.locator(dataTestIdSelector(TEST_IDS.title))).toHaveText(NESTED_DRAWER_TITLE);
    await expect(nestedRoot.locator(dataTestIdSelector(TEST_IDS.body))).toContainText(NESTED_DRAWER_BODY);

    // Close nested drawer via its own close button (X). Footer-button close is
    // not addressable by stable test-id — close button serves the same purpose.
    await nestedRoot.locator(dataTestIdSelector(TEST_IDS.closeButton)).click();
    await expect(nestedRoot).not.toBeAttached();
    await expect(getByTestId(TEST_IDS.header).first()).toBeVisible();
  });
});
