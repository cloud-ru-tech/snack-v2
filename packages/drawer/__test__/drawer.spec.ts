import { Locator, Page } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { POSITION, TEST_IDS, WIDTH } from '../src/constants';

const OVERLAY_SCROLL_VIEWPORT = '[data-overlayscrollbars-viewport]';

const OVERLAY_SCROLL_CONTENT = '[data-overlayscrollbars-content]';

const drawerPlaygroundStory = {
  name: 'drawer-playground' as const,
  story: 'playground' as const,
};

function drawerGotoOptions(props: Record<string, unknown> = {}) {
  return {
    ...drawerPlaygroundStory,
    props,
  };
}

function getScrollableBodyViewport(getByTestId: (testId: string) => Locator) {
  return getByTestId(TEST_IDS.body).locator(OVERLAY_SCROLL_VIEWPORT);
}

async function getScrollableBodyTarget(getByTestId: (testId: string) => Locator): Promise<Locator> {
  const body = getByTestId(TEST_IDS.body);
  const viewport = body.locator(OVERLAY_SCROLL_VIEWPORT);
  const content = body.locator(OVERLAY_SCROLL_CONTENT);

  await expect
    .poll(
      async () => {
        for (const candidate of [viewport, content, body]) {
          const scrollable = await candidate.evaluate(el => el.scrollHeight > el.clientHeight).catch(() => false);
          if (scrollable) {
            return true;
          }
        }
        return false;
      },
      { timeout: 15000 },
    )
    .toBeTruthy();

  for (const candidate of [viewport, content, body]) {
    const scrollable = await candidate.evaluate(el => el.scrollHeight > el.clientHeight);
    if (scrollable) {
      return candidate;
    }
  }

  return viewport;
}

function getOverlay(page: Page) {
  return page.locator('.rc-drawer-mask');
}

function getDrawerPanelFromHeader(page: Page, getByTestId: (testId: string) => Locator): Locator {
  return page
    .locator('[data-content-wrapper]')
    .filter({ has: getByTestId(TEST_IDS.header) })
    .first();
}

async function getDataPositionFromPanel(getByTestId: (testId: string) => Locator): Promise<string | null> {
  return getByTestId(TEST_IDS.header).evaluate(
    el => el.closest('[data-content-wrapper]')?.getAttribute('data-position') ?? null,
  );
}

async function getDataWidthFromPanel(getByTestId: (testId: string) => Locator): Promise<string | null> {
  return getByTestId(TEST_IDS.header).evaluate(
    el => el.closest('[data-content-wrapper]')?.getAttribute('data-width') ?? null,
  );
}

test.describe('Drawer', () => {
  test('should open from playground toggle with title, subtitle and body text', async ({
    gotoStory,
    getByTestId,
    page,
  }) => {
    const title = 'E2E drawer title';
    const subtitle = 'E2E drawer subtitle';
    const bodyText = 'E2E body line';

    await gotoStory(
      drawerGotoOptions({
        open: false,
        title,
        subtitle,
        content: bodyText,
        longBodyContent: false,
        showMedia: false,
        showAfterHeadline: false,
      }),
    );

    await page.getByRole('button', { name: 'Toggle drawer' }).click();

    await expect(getByTestId(TEST_IDS.header)).toBeVisible();

    await expect(getByTestId(TEST_IDS.title)).toHaveText(title);
    await expect(getByTestId(TEST_IDS.subtitle)).toHaveText(subtitle);
    await expect(getByTestId(TEST_IDS.body)).toContainText(bodyText);

    const position = await getDataPositionFromPanel(getByTestId);
    await expect(position).toBe(POSITION.Right);

    const panel = getDrawerPanelFromHeader(page, getByTestId);
    const rightValue = await panel.evaluate(el => getComputedStyle(el).right);
    await expect(rightValue).toBe('0px');
  });

  test('should keep short body content without vertical scroll', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(
      drawerGotoOptions({
        open: true,
        content: 'Short',
        longBodyContent: false,
        showMedia: false,
        showAfterHeadline: false,
      }),
    );

    const viewport = getScrollableBodyViewport(getByTestId);
    await expect(viewport).toBeVisible();

    await page.mouse.wheel(0, 1000);
    const scrollTop = await viewport.evaluate(el => el.scrollTop);
    await expect(scrollTop).toBe(0);
  });

  test('should render left placement and hide subtitle when empty', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(
      drawerGotoOptions({
        open: true,
        position: POSITION.Left,
        subtitle: '',
        showMedia: true,
        showAfterHeadline: false,
      }),
    );

    await expect(getByTestId(TEST_IDS.header)).toBeVisible();

    const position = await getDataPositionFromPanel(getByTestId);
    await expect(position).toBe(POSITION.Left);

    const panel = getDrawerPanelFromHeader(page, getByTestId);
    const leftValue = await panel.evaluate(el => getComputedStyle(el).left);
    await expect(leftValue).toBe('0px');

    await expect(getByTestId(TEST_IDS.subtitle)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.image)).toBeVisible();
  });

  test('should close on overlay click, close button click and Escape', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(drawerGotoOptions({ open: true, showAfterHeadline: false }));

    await expect(getByTestId(TEST_IDS.header)).toBeVisible();

    await getOverlay(page).click();
    await expect(getByTestId(TEST_IDS.header)).not.toBeVisible();

    await page.getByRole('button', { name: 'Toggle drawer' }).click();
    await expect(getByTestId(TEST_IDS.header)).toBeVisible();

    await getByTestId(TEST_IDS.closeButton).click();
    await expect(getByTestId(TEST_IDS.header)).not.toBeVisible();

    await page.getByRole('button', { name: 'Toggle drawer' }).click();
    await expect(getByTestId(TEST_IDS.header)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.header)).not.toBeVisible();
  });

  test('should detach overlay when showBlackout is false; Esc closes via CloseWatcher; close button works', async ({
    gotoStory,
    getByTestId,
    page,
  }) => {
    await gotoStory(
      drawerGotoOptions({
        open: true,
        showBlackout: false,
        showAfterHeadline: false,
      }),
    );

    await expect(getByTestId(TEST_IDS.header)).toBeVisible();

    await expect(getOverlay(page)).not.toBeAttached();

    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.header)).not.toBeVisible();

    await page.getByRole('button', { name: 'Toggle drawer' }).click();
    await expect(getByTestId(TEST_IDS.header)).toBeVisible();

    await getByTestId(TEST_IDS.closeButton).click();
    await expect(getByTestId(TEST_IDS.header)).not.toBeVisible();
  });

  test('should scroll long body content', async ({ gotoStory, getByTestId, scrollBy, getScrollTop, page }) => {
    const originalViewport = page.viewportSize() ?? { width: 1200, height: 871 };
    await page.setViewportSize({ width: 900, height: 480 });
    try {
      await gotoStory(
        drawerGotoOptions({
          open: true,
          longBodyContent: true,
          showAfterHeadline: false,
          showMedia: false,
        }),
      );

      await expect(getByTestId(TEST_IDS.body)).toContainText('Lorem', { timeout: 15000 });

      const scrollTarget = await getScrollableBodyTarget(getByTestId);
      await expect(scrollTarget).toBeVisible();

      await scrollBy(scrollTarget, { top: 120, behavior: 'auto' });

      await expect(getScrollTop(scrollTarget)).not.toBe(0);
    } finally {
      await page.setViewportSize(originalViewport);
    }
  });

  test('should render footer actions from playground', async ({ gotoStory, getByTestId }) => {
    await gotoStory(drawerGotoOptions({ open: true, showAfterHeadline: false }));

    const footer = getByTestId(TEST_IDS.footer);
    await expect(footer).toBeVisible();

    const footerButtons = footer.getByRole('button');
    await expect(footerButtons).toHaveCount(2);
  });

  test('should expose preset width on drawer panel', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      drawerGotoOptions({
        open: true,
        width: WIDTH.M,
        showAfterHeadline: false,
      }),
    );

    const dataWidth = await getDataWidthFromPanel(getByTestId);
    await expect(dataWidth).toBe(WIDTH.M);
  });

  test('should render question-tooltip trigger in header when enabled in story', async ({ gotoStory, getByTestId }) => {
    const tip = 'E2E tooltip copy';
    await gotoStory(
      drawerGotoOptions({
        open: true,
        showAfterHeadline: true,
        customTooltipText: tip,
      }),
    );

    await expect(getByTestId(TEST_IDS.header).getByRole('button', { name: 'Подсказка' })).toBeVisible();
  });

  test('should hide back button when story disables it', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      drawerGotoOptions({
        open: true,
        showBackButton: false,
        showAfterHeadline: false,
      }),
    );

    await expect(getByTestId(TEST_IDS.header).getByRole('button')).toHaveCount(0);
  });
});
