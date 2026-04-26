import { expect, test } from '../../../../playwright/fixtures';
import { SIZE } from '../../src/constants';
import { buildCheckboxStory, CHECKBOX_SIZE_PX, CHECKBOX_TEST_ID, NATIVE_INPUT_SUFFIX } from '../_shared/helpers';

test.describe('Checkbox — rendering', () => {
  test('renders root with role=checkbox', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory());

    const root = getByTestId(CHECKBOX_TEST_ID);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('role', 'checkbox');
  });

  test('renders native input with type=checkbox', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory());

    const input = getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(input).toHaveAttribute('type', 'checkbox');
  });

  test.describe('props propagation', () => {
    test('forwards id and name to native input', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCheckboxStory({ id: 'cb-id', name: 'cb-name' }));

      const input = getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
      await expect(input).toHaveAttribute('id', 'cb-id');
      await expect(input).toHaveAttribute('name', 'cb-name');
    });

    test('applies custom className on the root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCheckboxStory({ className: 'cb-custom' }));

      await expect(getByTestId(CHECKBOX_TEST_ID)).toHaveClass(/cb-custom/);
    });

    for (const size of Object.values(SIZE)) {
      test(`data-size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildCheckboxStory({ size }));

        await expect(getByTestId(CHECKBOX_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('states', () => {
    test('disabled: has data-disabled and native disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCheckboxStory({ disabled: true }));

      const root = getByTestId(CHECKBOX_TEST_ID);
      const input = getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
      await expect(root).toHaveAttribute('data-disabled', 'true');
      await expect(input).toBeDisabled();
    });

    test('loading: hides native input and sets data-loading', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCheckboxStory({ loading: true }));

      await expect(getByTestId(CHECKBOX_TEST_ID)).toHaveAttribute('data-loading', 'true');
      await expect(getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toHaveCount(0);
    });

    test('checked: root gets data-checked=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCheckboxStory({ checked: true }));

      await expect(getByTestId(CHECKBOX_TEST_ID)).toHaveAttribute('data-checked', 'true');
      await expect(getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeChecked();
    });

    test('indeterminate: root gets data-indeterminate=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCheckboxStory({ indeterminate: true }));

      await expect(getByTestId(CHECKBOX_TEST_ID)).toHaveAttribute('data-indeterminate', 'true');
    });
  });

  test.describe('dimensions (Figma parity)', () => {
    for (const size of Object.values(SIZE)) {
      test(`size=${size} matches Figma square`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildCheckboxStory({ size }));

        const box = await getByTestId(CHECKBOX_TEST_ID).boundingBox();
        expect(box).not.toBeNull();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(Math.round(box!.height)).toBeCloseTo(CHECKBOX_SIZE_PX[size], 0);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(Math.round(box!.width)).toBeCloseTo(CHECKBOX_SIZE_PX[size], 0);
      });
    }
  });
});
