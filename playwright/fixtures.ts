import { expect as playwrightExpect, Locator, test as base } from '@playwright/test';

import { dataTestIdSelector, getStorybookUrl, StorybookUrlOptions } from './utils';

type DragOptions = {
  targetPosition?: { x: number; y: number };
  target?: Locator;
  steps?: number;
};

type PlaywrightFixtures = {
  gotoStory(options: StorybookUrlOptions): Promise<void>;
  getByTestId(testId: string): Locator;
  scrollBy(locator: Locator, options?: { top?: number; left?: number; behavior?: ScrollBehavior }): Promise<void>;
  getScrollTop(locator: Locator): Promise<number>;
  waitForNavigation(expectedPath: string, options?: { timeout?: number }): Promise<void>;
  dragTo(locator: Locator, options?: DragOptions): Promise<void>;
};

export const test = base.extend<PlaywrightFixtures>({
  gotoStory: async ({ page }, customUse) => {
    await customUse(async (options: StorybookUrlOptions) => {
      const url = getStorybookUrl(options);
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      await page.waitForLoadState('load');

      const storybookLoaderLocator = page.locator('.sb-preparing-story .sb-loader');
      await playwrightExpect(storybookLoaderLocator).toBeHidden({ timeout: 10000 });

      const errorMessage = page.locator("text=/Couldn't find story|Unable to find story|Story not found/i");
      const errorVisible = await errorMessage.isVisible().catch(() => false);
      if (errorVisible) {
        throw new Error(`Story not found: ${url}`);
      }

      // Ожидание рендера storybook-root (в Storybook 10+ используется #storybook-root)
      await playwrightExpect(page.locator('#storybook-root')).toBeAttached({ timeout: 15000 });

      // Apply URL args via the preview channel. Storybook 10's iframe.html parses
      // selectionSpecifier.args from the URL but only applies them when the
      // manager app sends them back via channel — which never happens when we
      // load iframe.html directly. We emit updateStoryArgs manually so URL args
      // passed through getStorybookUrl actually reach the rendered story.
      await page
        .waitForFunction(
          () => {
            const api = (
              window as unknown as { __STORYBOOK_PREVIEW__?: { channel?: unknown; selectionStore?: unknown } }
            ).__STORYBOOK_PREVIEW__;
            return Boolean(api?.channel && api?.selectionStore);
          },
          { timeout: 5000 },
        )
        .catch(() => {});

      const appliedArgs = await page.evaluate(() => {
        const api = (
          window as unknown as {
            __STORYBOOK_PREVIEW__?: {
              channel?: { emit: (event: string, payload: unknown) => void };
              selectionStore?: {
                selection?: { storyId?: string };
                selectionSpecifier?: { args?: Record<string, unknown> };
              };
            };
          }
        ).__STORYBOOK_PREVIEW__;
        const storyId = api?.selectionStore?.selection?.storyId;
        const args = api?.selectionStore?.selectionSpecifier?.args;
        if (!api?.channel || !storyId || !args || Object.keys(args).length === 0) {
          return null;
        }
        api.channel.emit('updateStoryArgs', { storyId, updatedArgs: args });
        return args;
      });

      if (appliedArgs) {
        // Give Storybook a tick to re-render with updated args.
        await page.waitForLoadState('networkidle').catch(() => {});
      }
    });
  },
  getByTestId: async ({ page }, customUse) => {
    await customUse((testId: string) => page.locator(dataTestIdSelector(testId)));
  },
  // eslint-disable-next-line no-empty-pattern
  scrollBy: async ({}, customUse) => {
    await customUse(async (locator: Locator, options?: { top?: number; left?: number; behavior?: ScrollBehavior }) => {
      const isScrollable = await locator.evaluate(el => el.scrollHeight > el.clientHeight);

      if (!isScrollable) {
        throw new Error('Content is not scrollable - scrollHeight should be greater than clientHeight');
      }

      await locator.evaluate((el, opts) => {
        el.scrollBy({
          top: opts?.top ?? 0,
          left: opts?.left ?? 0,
          behavior: opts?.behavior ?? 'auto',
        });
      }, options);
    });
  },
  // eslint-disable-next-line no-empty-pattern
  getScrollTop: async ({}, customUse) => {
    await customUse(async (locator: Locator) => await locator.evaluate(el => el.scrollTop));
  },
  waitForNavigation: async ({ page }, customUse) => {
    await customUse(async (expectedPath: string, options?: { timeout?: number }) => {
      await page
        .waitForFunction(
          (path: string) => {
            // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi
            const url = window.location.pathname + window.location.search + window.location.hash;
            return url.includes(path);
          },
          expectedPath,
          { timeout: options?.timeout ?? 5000 },
        )
        .catch(() => {});
    });
  },
  dragTo: async ({ page }, customUse) => {
    await customUse(async (locator: Locator, options?: DragOptions) => {
      const elementBox = await locator.boundingBox();
      if (!elementBox) {
        throw new Error('Element is not visible or has no bounding box');
      }

      const startX = elementBox.x + elementBox.width / 2;
      const startY = elementBox.y + elementBox.height / 2;

      let endX: number;
      let endY: number;

      if (options?.target) {
        const targetBox = await options.target.boundingBox();
        if (!targetBox) {
          throw new Error('Target element is not visible or has no bounding box');
        }
        endX = targetBox.x + targetBox.width / 2;
        endY = targetBox.y + targetBox.height / 2;
      } else if (options?.targetPosition) {
        endX = startX + options.targetPosition.x;
        endY = startY + options.targetPosition.y;
      } else {
        throw new Error('Either target or targetPosition must be provided');
      }

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(endX, endY, { steps: options?.steps ?? 10 });
      await page.mouse.up();
    });
  },
});

export { expect, type Locator, type Page } from '@playwright/test';
