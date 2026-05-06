import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, COPY_BUTTON_HIDE_STRATEGIES, COPY_LINE_TEST_ID } from './helpers';

test.describe('CopyLine — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(COPY_LINE_TEST_ID)).toBeVisible();
    });

    test('renders content text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ content: 'visible-payload' }));

      await expect(getByTestId(COPY_LINE_TEST_ID)).toContainText('visible-payload');
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ className: 'custom-line' }));

      await expect(getByTestId(COPY_LINE_TEST_ID)).toHaveClass(/custom-line/);
    });

    test('exposes inner copy button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ copyButtonHideStrategy: 'never' }));

      const root = getByTestId(COPY_LINE_TEST_ID);
      await expect(root.locator('button[aria-label="Copy"]')).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const strategy of COPY_BUTTON_HIDE_STRATEGIES) {
      test(`copyButtonHideStrategy=${strategy}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ copyButtonHideStrategy: strategy }));

        await expect(getByTestId(COPY_LINE_TEST_ID)).toHaveAttribute('data-copy-button-hide-strategy', strategy);
      });
    }
  });

  test.describe('states', () => {
    test('hover strategy hides button until hover', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ copyButtonHideStrategy: 'hover' }));

      const root = getByTestId(COPY_LINE_TEST_ID);
      const copyBtn = root.locator('button[aria-label="Copy"]');

      // Перед hover кнопка не видима пользователю (CSS-скрыта).
      await expect(copyBtn).toBeHidden();

      await root.hover();
      await expect(copyBtn).toBeVisible();

      // Возвращаем мышь за пределы — кнопка должна снова скрыться.
      await page.mouse.move(0, 0);
      await expect(copyBtn).toBeHidden();
    });

    test('never strategy keeps button always visible', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ copyButtonHideStrategy: 'never' }));

      const copyBtn = getByTestId(COPY_LINE_TEST_ID).locator('button[aria-label="Copy"]');

      await expect(copyBtn).toBeVisible();
    });
  });
});
