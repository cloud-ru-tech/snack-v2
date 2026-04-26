import { expect, test } from '../../../../playwright/fixtures';
import { SIZE } from '../../src/constants';
import { buildRadioStory, NATIVE_INPUT_SUFFIX, RADIO_SIZE_PX, RADIO_TEST_ID } from '../_shared/helpers';

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

  test.describe('props propagation', () => {
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

    for (const size of Object.values(SIZE)) {
      test(`data-size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildRadioStory({ size }));
        await expect(getByTestId(RADIO_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('states', () => {
    test('disabled: data-disabled + native disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildRadioStory({ disabled: true }));

      await expect(getByTestId(RADIO_TEST_ID)).toHaveAttribute('data-disabled', 'true');
      await expect(getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeDisabled();
    });

    test('loading: hides native input and sets data-loading', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildRadioStory({ loading: true }));

      await expect(getByTestId(RADIO_TEST_ID)).toHaveAttribute('data-loading', 'true');
      await expect(getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toHaveCount(0);
    });

    test('checked: root gets data-checked', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildRadioStory({ checked: true }));

      await expect(getByTestId(RADIO_TEST_ID)).toHaveAttribute('data-checked', 'true');
      await expect(getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeChecked();
    });
  });

  test.describe('dimensions (Figma parity)', () => {
    for (const size of Object.values(SIZE)) {
      test(`size=${size} matches Figma`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildRadioStory({ size }));

        const box = await getByTestId(RADIO_TEST_ID).boundingBox();
        expect(box).not.toBeNull();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(Math.round(box!.height)).toBeCloseTo(RADIO_SIZE_PX[size], 0);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(Math.round(box!.width)).toBeCloseTo(RADIO_SIZE_PX[size], 0);
      });
    }
  });
});
