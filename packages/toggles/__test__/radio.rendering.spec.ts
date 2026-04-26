import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/constants';
import { buildRadioStory, NATIVE_INPUT_SUFFIX, RADIO_TEST_ID } from './helpers';

test.describe('Radio — rendering', () => {
  test('renders root with role=radio', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory());

    const root = getByTestId(RADIO_TEST_ID);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('role', 'radio');
  });

  test('renders native input with type=radio', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory());

    await expect(getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toHaveAttribute('type', 'radio');
  });

  test('applies custom className', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory({ className: 'radio-custom' }));
    await expect(getByTestId(RADIO_TEST_ID)).toHaveClass(/radio-custom/);
  });

  test('forwards name and value to native input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory({ name: 'opts', value: 'a' }));

    const input = getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(input).toHaveAttribute('name', 'opts');
    await expect(input).toHaveAttribute('value', 'a');
  });

  test.describe('sizes', () => {
    for (const size of Object.values(SIZE)) {
      test(`data-size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildRadioStory({ size }));
        await expect(getByTestId(RADIO_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }
  });
});
