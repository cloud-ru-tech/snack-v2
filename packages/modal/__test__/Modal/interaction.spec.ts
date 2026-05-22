import { expect, test } from '#playwright-tooling/fixtures';

import { MODE } from '../../src/constants';
import { buildStoryOptions, MODAL_TRIGGER_TEST_ID, TEST_IDS } from './helpers';

const M = TEST_IDS.modal;

test.describe('Modal — interaction', () => {
  test('opens via trigger button from closed state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await getByTestId(MODAL_TRIGGER_TEST_ID).click();
    await expect(getByTestId(M.root)).toBeVisible();
  });

  test('Regular mode closes by overlay click and close button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: MODE.Regular }));
    await getByTestId(MODAL_TRIGGER_TEST_ID).click();

    await getByTestId(M.overlay).click({ position: { x: 5, y: 5 } });
    await expect(getByTestId(M.root)).not.toBeVisible();

    await getByTestId(MODAL_TRIGGER_TEST_ID).click();
    await getByTestId(M.closeButton).click();
    await expect(getByTestId(M.root)).not.toBeVisible();
  });

  test('Aggressive mode keeps modal on overlay click; close button visible', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: MODE.Aggressive }));
    await getByTestId(MODAL_TRIGGER_TEST_ID).click();

    await expect(getByTestId(M.closeButton)).toBeVisible();
    await getByTestId(M.overlay).click({ position: { x: 5, y: 5 } });
    await expect(getByTestId(M.root)).toBeVisible();
  });

  test('Forced mode keeps modal on overlay click and has no close button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: MODE.Forced }));
    await getByTestId(MODAL_TRIGGER_TEST_ID).click();

    await expect(getByTestId(M.closeButton)).not.toBeVisible();
    await getByTestId(M.overlay).click({ position: { x: 5, y: 5 } });
    await expect(getByTestId(M.root)).toBeVisible();
  });

  test('scrolls long content', async ({ gotoStory, getByTestId, scrollBy, getScrollTop }) => {
    await gotoStory(buildStoryOptions({ longBodyContent: true }));
    await getByTestId(MODAL_TRIGGER_TEST_ID).click();

    const body = getByTestId(M.body);
    const viewport = body.locator('[data-overlayscrollbars-viewport]');
    const contents = body.locator('[data-overlayscrollbars-contents]');
    const content = viewport.or(contents);

    await expect(content).toBeVisible();
    await scrollBy(content, { top: 100, behavior: 'auto' });
    expect(await getScrollTop(content)).not.toEqual(0);
  });

  test('body scroll is locked when modal is open', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: MODE.Regular }));
    await getByTestId(MODAL_TRIGGER_TEST_ID).click();

    await page.evaluate(() => {
      document.documentElement.style.minHeight = '300vh';
      window.scrollTo(0, 200);
    });

    await expect(getByTestId(M.root)).toBeVisible();
    const scrollYBefore = await page.evaluate(() => window.scrollY);

    // Dispatch wheel on document.body — outside modal portal area.
    await page.evaluate(() => {
      const event = new WheelEvent('wheel', { deltaY: 1200, bubbles: true, cancelable: true });
      document.body.dispatchEvent(event);
    });
    // And via real input on a top-left point that's almost certainly outside the dialog.
    await page.mouse.move(2, 2);
    await page.mouse.wheel(0, 1200);

    const scrollYAfter = await page.evaluate(() => window.scrollY);
    expect(scrollYAfter).toBe(scrollYBefore);
  });

  test('overlay wheel does not scroll the page', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        mode: MODE.Regular,
        title: 'Title',
        content: '',
      }),
    );

    await page.evaluate(() => {
      document.documentElement.style.minHeight = '200vh';
      window.scrollTo(0, 400);
    });

    await getByTestId(MODAL_TRIGGER_TEST_ID).click();
    await expect(getByTestId(M.root)).toBeVisible();

    const scrollYBefore = await page.evaluate(() => window.scrollY);

    const box = await getByTestId(M.overlay).boundingBox();
    if (box == null) {
      throw new Error('Expected overlay bounding box');
    }
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.wheel(0, 1200);

    const scrollYAfter = await page.evaluate(() => window.scrollY);
    expect(scrollYAfter).toBe(scrollYBefore);
  });
});
