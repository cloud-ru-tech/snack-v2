import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiShimmer — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('text propagates to shimmer layer', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ text: 'Custom shimmer text' }));
    await expect(getByTestId(TEST_IDS.text)).toHaveText('Custom shimmer text');
  });

  test('size propagates to root data attribute', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ size: 'l' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-size', 'l');
  });

  test('variant propagates to root data attribute', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ variant: 'headline' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-variant', 'headline');
  });

  test('weight propagates to root data attribute', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ weight: 'thin' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-weight', 'thin');
  });

  test('shimmer effect is applied', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const backgroundClip = await getByTestId(TEST_IDS.spread).evaluate(
      element => window.getComputedStyle(element).backgroundClip,
    );

    expect(backgroundClip).toContain('text');
  });

  test('uses full container width', async ({ gotoStory, getByTestId }) => {
    // Кириллица в URL-args не резолвится Storybook'ом (падает на дефолт) — см. test-environment-pitfalls.md.
    await gotoStory(buildStoryOptions({ text: 'abc' }));

    await expect
      .poll(async () => {
        const sizes = await getByTestId(TEST_IDS.root).evaluate(element => {
          const parent = element.parentElement;

          return {
            rootWidth: element.getBoundingClientRect().width,
            parentWidth: parent?.getBoundingClientRect().width ?? 0,
          };
        });

        return sizes.parentWidth > 0 && sizes.rootWidth >= sizes.parentWidth * 0.95;
      })
      .toBe(true);
  });

  test('long text uses full container width in wide layout', async ({ gotoStory, getByTestId }) => {
    const longText = 'Random shimmer text '.repeat(20).trim();

    await gotoStory(buildStoryOptions({ text: longText }));

    await expect
      .poll(async () => {
        const sizes = await getByTestId(TEST_IDS.root).evaluate(element => {
          const parent = element.parentElement;

          return {
            rootWidth: element.getBoundingClientRect().width,
            parentWidth: parent?.getBoundingClientRect().width ?? 0,
          };
        });

        return sizes.parentWidth > 0 && sizes.rootWidth >= sizes.parentWidth * 0.95;
      })
      .toBe(true);
  });

  test('long text wraps in narrow container', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        text: 'Officia cillum labore enim eiusmod exercitation ullamco occaecat utminim consequat labore occaecat est.',
      }),
    );

    await page.evaluate(() => {
      const root = document.querySelector('[data-test-id="ai-shimmer"]');

      if (root?.parentElement) {
        root.parentElement.style.width = '240px';
      }
    });

    await expect
      .poll(async () =>
        getByTestId(TEST_IDS.root).evaluate(element => Number.parseFloat(window.getComputedStyle(element).height)),
      )
      .toBeGreaterThan(48);
  });

  for (const text of ['as', 'xyz'] as const) {
    test(`short text "${text}" stays on one line in wide container`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ text }));

      const lineCount = await getByTestId(TEST_IDS.text).evaluate(element => element.getClientRects().length);

      expect(lineCount).toBe(1);
    });
  }
});
