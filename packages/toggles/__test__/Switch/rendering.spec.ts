import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import {
  buildSwitchStory,
  NATIVE_INPUT_SUFFIX,
  SWITCH_HEIGHT_PX,
  SWITCH_TEST_ID,
  SWITCH_WIDTH_PX,
} from '../_shared/helpers';

test.describe('Switch — rendering', () => {
  test('renders visible root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    await expect(getByTestId(SWITCH_TEST_ID)).toBeVisible();
  });

  test('renders native input with type=checkbox', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    await expect(getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toHaveAttribute('type', 'checkbox');
  });

  test.describe('props propagation', () => {
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

    for (const size of Object.values(SIZE)) {
      test(`data-size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildSwitchStory({ size }));
        await expect(getByTestId(SWITCH_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('states', () => {
    test('disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildSwitchStory({ disabled: true }));
      await expect(getByTestId(SWITCH_TEST_ID)).toHaveAttribute('data-disabled', 'true');
      await expect(getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeDisabled();
    });

    test('loading hides native input', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildSwitchStory({ loading: true }));
      await expect(getByTestId(SWITCH_TEST_ID)).toHaveAttribute('data-loading', 'true');
      await expect(getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toHaveCount(0);
    });

    test('checked sets data-checked', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildSwitchStory({ checked: true }));
      await expect(getByTestId(SWITCH_TEST_ID)).toHaveAttribute('data-checked', 'true');
      await expect(getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeChecked();
    });
  });

  test.describe('dimensions (Figma parity)', () => {
    for (const size of Object.values(SIZE)) {
      test(`size=${size} matches Figma rectangle`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildSwitchStory({ size }));

        const box = await getByTestId(SWITCH_TEST_ID).boundingBox();
        expect(box).not.toBeNull();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(Math.round(box!.height)).toBeCloseTo(SWITCH_HEIGHT_PX[size], 0);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(Math.round(box!.width)).toBeCloseTo(SWITCH_WIDTH_PX[size], 0);
      });
    }
  });
});
