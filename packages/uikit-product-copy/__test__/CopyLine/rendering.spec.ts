import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, COPY_LINE_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('CopyLine — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.copyLine.root)).toBeVisible();
    });

    test('renders content text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ content: 'visible-payload' }));

      await expect(getByTestId(TEST_IDS.copyLine.root)).toContainText('visible-payload');
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ className: 'custom-line' }));

      await expect(getByTestId(TEST_IDS.copyLine.root)).toHaveClass(/custom-line/);
    });

    test('exposes inner copy button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ copyButtonHideStrategy: 'never' }));

      await expect(getByTestId(TEST_IDS.copyLine.copyButton)).toBeVisible();
    });
  });

  test('props propagation', async ({ gotoStory, getByTestId }) => {
    for (const { copyButtonHideStrategy } of COPY_LINE_KEY_COMBOS) {
      await gotoStory(buildStoryOptions({ copyButtonHideStrategy }));

      await expect(getByTestId(TEST_IDS.copyLine.root)).toHaveAttribute(
        'data-copy-button-hide-strategy',
        copyButtonHideStrategy,
      );
    }
  });

  test.describe('states', () => {
    test('hover strategy hides button until hover', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ copyButtonHideStrategy: 'hover' }));

      const root = getByTestId(TEST_IDS.copyLine.root);
      const copyBtn = getByTestId(TEST_IDS.copyLine.copyButton);

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

      const copyBtn = getByTestId(TEST_IDS.copyLine.copyButton);

      await expect(copyBtn).toBeVisible();
    });
  });
});
