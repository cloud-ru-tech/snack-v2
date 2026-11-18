import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('Block — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { size, view } of KEY_COMBOS) {
      test(`size=${size}, view=${view}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, view }));

        const root = getByTestId(TEST_IDS.root);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-view', view);
      });
    }
  });
  test('does not reserve space for empty React content', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions(undefined, { name: 'block-tests-headercontent', story: 'header-content-test' }));
    for (const size of ['s', 'm', 'l']) {
      const reference = page.getByTestId(`header-${size}-undefined`);
      await expect(reference).toBeVisible();
      const referenceHeight = (await reference.boundingBox())?.height;
      for (const value of ['null', 'false', 'true', 'string', 'array', 'fragment', 'component']) {
        const root = page.getByTestId(`header-${size}-${value}`);
        await expect(root).toBeVisible();
        expect((await root.boundingBox())?.height).toBe(referenceHeight);
      }
      await expect(page.getByTestId(`header-${size}-zero`).getByText('0', { exact: true })).toBeVisible();
      await expect(page.getByTestId(`header-${size}-content`).getByText('Header', { exact: true })).toBeVisible();
    }
  });

  for (const [size, gap] of [
    ['s', 8],
    ['m', 16],
    ['l', 24],
  ] as const) {
    test(`header fills resized block and uses component gap: ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ size, headerText: 'Block header' }));
      const root = getByTestId(TEST_IDS.root);
      const header = root.getByText('Block header', { exact: true });
      await expect(header).toBeVisible();

      for (const width of [200, 400]) {
        await root.evaluate((element, value) => {
          element.style.width = `${value}px`;
        }, width);
        const geometry = await header.evaluate(element => {
          const body = element.nextElementSibling;
          const parent = element.parentElement;
          if (!body || !parent) throw new Error('Header must precede the body inside Block');
          const style = getComputedStyle(parent);
          return {
            width: element.getBoundingClientRect().width,
            available: parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
            gap: body.getBoundingClientRect().top - element.getBoundingClientRect().bottom,
          };
        });
        expect(geometry.width).toBeCloseTo(geometry.available, 1);
        expect(geometry.gap).toBeCloseTo(gap, 1);
      }
    });
  }
});
