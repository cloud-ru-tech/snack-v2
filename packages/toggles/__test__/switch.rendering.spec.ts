import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/constants';
import { buildSwitchStory, NATIVE_INPUT_SUFFIX, SWITCH_TEST_ID } from './helpers';

test.describe('Switch — rendering', () => {
  test('renders visible root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    await expect(getByTestId(SWITCH_TEST_ID)).toBeVisible();
  });

  test('renders native input with type=checkbox', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    await expect(getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toHaveAttribute('type', 'checkbox');
  });

  test('forwards id and name', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory({ id: 'sw-id', name: 'sw-name' }));
    const input = getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(input).toHaveAttribute('id', 'sw-id');
    await expect(input).toHaveAttribute('name', 'sw-name');
  });

  test('applies custom className', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory({ className: 'switch-custom' }));
    await expect(getByTestId(SWITCH_TEST_ID)).toHaveClass(/switch-custom/);
  });

  test.describe('sizes', () => {
    for (const size of Object.values(SIZE)) {
      test(`data-size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildSwitchStory({ size }));
        await expect(getByTestId(SWITCH_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }
  });
});
