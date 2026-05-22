import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import { buildSwitchStory, SWITCH_HEIGHT_PX, SWITCH_WIDTH_PX, TEST_IDS } from '../_shared/helpers';

test.describe('Switch — rendering', () => {
  test('renders visible root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    await expect(getByTestId(TEST_IDS.switch.root)).toBeVisible();
  });

  test('renders native input with type=checkbox', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    await expect(getByTestId(TEST_IDS.switch.nativeInput)).toHaveAttribute('type', 'checkbox');
  });

  test.describe('props propagation', () => {
    test('forwards id and name', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildSwitchStory({ id: 'sw-id', name: 'sw-name' }));
      const input = getByTestId(TEST_IDS.switch.nativeInput);
      await expect(input).toHaveAttribute('id', 'sw-id');
      await expect(input).toHaveAttribute('name', 'sw-name');
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildSwitchStory({ className: 'switch-custom' }));
      await expect(getByTestId(TEST_IDS.switch.root)).toHaveClass(/switch-custom/);
    });

    for (const size of Object.values(SIZE)) {
      test(`data-size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildSwitchStory({ size }));
        await expect(getByTestId(TEST_IDS.switch.root)).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('states', () => {
    test('disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildSwitchStory({ disabled: true }));
      await expect(getByTestId(TEST_IDS.switch.root)).toHaveAttribute('data-disabled', 'true');
      await expect(getByTestId(TEST_IDS.switch.nativeInput)).toBeDisabled();
    });

    test('loading hides native input', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildSwitchStory({ loading: true }));
      await expect(getByTestId(TEST_IDS.switch.root)).toHaveAttribute('data-loading', 'true');
      await expect(getByTestId(TEST_IDS.switch.nativeInput)).toHaveCount(0);
    });

    test('checked sets data-checked', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildSwitchStory({ checked: true }));
      await expect(getByTestId(TEST_IDS.switch.root)).toHaveAttribute('data-checked', 'true');
      await expect(getByTestId(TEST_IDS.switch.nativeInput)).toBeChecked();
    });
  });

  test.describe('dimensions (Figma parity)', () => {
    for (const size of Object.values(SIZE)) {
      test(`size=${size} matches Figma rectangle`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildSwitchStory({ size }));

        const box = await getByTestId(TEST_IDS.switch.root).boundingBox();
        expect(box).not.toBeNull();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(Math.round(box!.height)).toBeCloseTo(SWITCH_HEIGHT_PX[size], 0);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(Math.round(box!.width)).toBeCloseTo(SWITCH_WIDTH_PX[size], 0);
      });
    }
  });
});
