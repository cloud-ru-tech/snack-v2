import { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { MODE, TEST_IDS as componentsTestIDs } from '../src/constants';
import { STORY_TEST_IDS } from '../stories/Modal/constants';

const TEST_IDS = {
  ...componentsTestIDs,
  ...STORY_TEST_IDS,
  main: 'modal-test',
  customLoaderState: 'modal__custom-loader',
};

const MOCK_DATA = {
  title: 'test title',
  subtitle: 'test subtitle',
  content: 'test content',
};

function getScrollableElement(getByTestId: (testId: string) => Locator) {
  return getByTestId(TEST_IDS.body).locator('[data-overlayscrollbars-contents]');
}

test.describe('Modal', () => {
  test("Opens correctly with proper header, footer and content. Shouldn't have scroll", async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'modal',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.main,
        open: false,
        title: MOCK_DATA.title,
        subtitle: MOCK_DATA.subtitle,
        content: MOCK_DATA.content,
        showFooter: true,
      },
    });

    await getByTestId(TEST_IDS.buttonControlled).click();
    await expect(getByTestId(TEST_IDS.main)).toBeVisible();

    await expect(getByTestId(TEST_IDS.title)).toHaveText(MOCK_DATA.title);
    await expect(getByTestId(TEST_IDS.subtitle)).toHaveText(MOCK_DATA.subtitle);
    await expect(getByTestId(TEST_IDS.backButton)).toBeVisible();
    await expect(getByTestId(TEST_IDS.slotAfterHeadline)).toBeVisible();

    await expect(getByTestId(TEST_IDS.body)).toHaveText(MOCK_DATA.content);

    await expect(getByTestId(TEST_IDS.footer)).toBeVisible();

    const content = getScrollableElement(getByTestId);

    await page.mouse.wheel(0, 1000);
    const scrollTop = await content.evaluate(el => el.scrollTop);
    await expect(scrollTop).toBe(0);
  });

  test('Should render without header and footer, content always visible', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'modal',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        showHeader: false,
        showFooter: false,
      },
    });
    await expect(getByTestId(TEST_IDS.title)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.subtitle)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.backButton)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.slotAfterHeadline)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.body)).toBeVisible();

    await expect(getByTestId(TEST_IDS.footer)).not.toBeVisible();
  });

  test('Closes by click on overlay/close-button for Regular modal', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'modal',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        mode: MODE.Regular,
      },
    });
    await getByTestId(TEST_IDS.overlay).click({ position: { x: 5, y: 5 } });
    await expect(getByTestId(TEST_IDS.main)).not.toBeVisible();

    await getByTestId(TEST_IDS.buttonControlled).click();
    await getByTestId(TEST_IDS.closeButton).click();
    await expect(getByTestId(TEST_IDS.main)).not.toBeVisible();
  });

  test(`Shouldn't close by click on overlay for Aggressive modal and close button exists`, async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'modal',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        mode: MODE.Aggressive,
      },
    });
    const closeBtn = getByTestId(TEST_IDS.closeButton);
    await expect(closeBtn).toBeVisible();

    await getByTestId(TEST_IDS.overlay).click({ position: { x: 5, y: 5 } });
    await expect(getByTestId(TEST_IDS.main)).toBeVisible();
  });

  test(`Shouldn't close by click on overlay for Forced modal and close button shouldn't exist`, async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'modal',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        mode: MODE.Forced,
      },
    });
    const closeBtn = getByTestId(TEST_IDS.closeButton);
    await expect(closeBtn).not.toBeVisible();

    await getByTestId(TEST_IDS.overlay).click({ position: { x: 5, y: 5 } });
    await expect(getByTestId(TEST_IDS.main)).toBeVisible();
  });

  test('Should scroll long content', async ({ gotoStory, getByTestId, scrollBy, getScrollTop }) => {
    await gotoStory({
      name: 'modal',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        longBodyContent: true,
      },
    });
    const content = getScrollableElement(getByTestId);

    await expect(content).toBeVisible();

    await scrollBy(content, { top: 100, behavior: 'auto' });

    await expect(getScrollTop(content)).not.toEqual(0);
  });

  test('Should display only header and loader spinner in loading state', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'modal',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        loading: true,
        title: MOCK_DATA.title,
        subtitle: MOCK_DATA.subtitle,
        content: MOCK_DATA.content,
      },
    });
    await expect(getByTestId(TEST_IDS.loadingSpinner)).toBeVisible();

    await expect(getByTestId(TEST_IDS.title)).toHaveText(MOCK_DATA.title);
    await expect(getByTestId(TEST_IDS.subtitle)).toHaveText(MOCK_DATA.subtitle);

    await expect(getByTestId(TEST_IDS.body)).not.toHaveText(MOCK_DATA.content);

    await expect(getByTestId(TEST_IDS.footer)).not.toBeVisible();
  });

  test('Should display only header and custom loader state in loading state', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'modal',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        loading: true,
        loadingState: 'Loading',
        title: MOCK_DATA.title,
        subtitle: MOCK_DATA.subtitle,
        content: MOCK_DATA.content,
      },
    });
    await expect(getByTestId(TEST_IDS.loadingSpinner)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.body)).toHaveText('Loading');

    await expect(getByTestId(TEST_IDS.title)).toHaveText(MOCK_DATA.title);
    await expect(getByTestId(TEST_IDS.subtitle)).toHaveText(MOCK_DATA.subtitle);

    await expect(getByTestId(TEST_IDS.footer)).not.toBeVisible();
  });

  test('Focus trap: initial focus on dialog container, Tab cycles footer and close, restores focus after Escape', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'modal',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.main,
        open: false,
        mode: MODE.Regular,
        showBackButton: false,
        showAfterHeadline: false,
        showMedia: false,
        showFooter: true,
        title: MOCK_DATA.title,
        subtitle: '',
        content: '',
      },
    });

    const toggle = getByTestId(TEST_IDS.buttonControlled);
    const firstButton = getByTestId(STORY_TEST_IDS.firstButton);
    const secondButton = getByTestId(STORY_TEST_IDS.secondButton);
    const closeBtn = getByTestId(TEST_IDS.closeButton);
    const dialog = getByTestId(TEST_IDS.main);

    await toggle.click();
    await expect(dialog).toBeVisible();

    await expect(dialog).toBeFocused();

    await page.keyboard.press('Tab');
    // ButtonGroup рендерит tertiary → secondary → primary в DOM; затем кнопка закрытия в ModalCustom.
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
    await expect(getByTestId(TEST_IDS.main)).not.toBeVisible();
    await expect(toggle).toBeFocused();
  });

  test('Does not scroll the page when wheeling over overlay while modal is open', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'modal',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.main,
        open: false,
        mode: MODE.Regular,
        title: MOCK_DATA.title,
        content: '',
      },
    });

    await page.evaluate(() => {
      document.documentElement.style.minHeight = '200vh';
      window.scrollTo(0, 400);
    });

    const scrollYWithPageScrolled = await page.evaluate(() => window.scrollY);
    expect(scrollYWithPageScrolled).toBeGreaterThan(0);

    await getByTestId(TEST_IDS.buttonControlled).click();
    await expect(getByTestId(TEST_IDS.main)).toBeVisible();

    // RemoveScroll locks the document; window.scrollY is typically 0 while open — baseline must be after open.
    const scrollYBeforeWheel = await page.evaluate(() => window.scrollY);

    const box = await getByTestId(TEST_IDS.overlay).boundingBox();
    if (box == null) {
      throw new Error('Expected overlay bounding box');
    }
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.wheel(0, 1200);

    const scrollYAfter = await page.evaluate(() => window.scrollY);
    expect(scrollYAfter).toBe(scrollYBeforeWheel);
  });
});
