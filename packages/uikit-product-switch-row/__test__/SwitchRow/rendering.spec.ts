import { expect, test } from '#playwright-tooling/fixtures';

import { SWITCH_ROW_TYPES } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

const SWITCH_ROW_KEY_COMBOS = [{ type: SWITCH_ROW_TYPES.Block }, { type: SWITCH_ROW_TYPES.Line }] as const;

test.describe('SwitchRow — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders title text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ title: 'Hello title' }));

      await expect(getByTestId(TEST_IDS.root)).toContainText('Hello title');
    });

    test('renders description when provided', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ description: 'Some description' }));

      await expect(getByTestId(TEST_IDS.description)).toContainText('Some description');
    });

    test('root has role=switch', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('role', 'switch');
    });
  });

  test.describe('props propagation', () => {
    for (const combo of SWITCH_ROW_KEY_COMBOS) {
      test(`type=${combo.type}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ type: combo.type }));

        await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-type', combo.type);
      });
    }

    test('name prop propagates to native input', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ name: 'notifications' }));

      await expect(getByTestId(`${TEST_IDS.switch}-native-input`)).toHaveAttribute('name', 'notifications');
    });
  });

  test.describe('states', () => {
    test('defaultChecked=true → aria-checked=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ defaultChecked: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('aria-checked', 'true');
    });

    test('checked=true (controlled) → aria-checked=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ checked: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('aria-checked', 'true');
    });

    test('checked=false (controlled) → aria-checked=false', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ checked: false }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('aria-checked', 'false');
    });

    test('disabled → data-disabled=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-disabled', 'true');
    });

    test('disabled → tabIndex=-1', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('tabindex', '-1');
    });

    test('enabled → tabIndex=0', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('tabindex', '0');
    });

    test('loading → data-loading=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-loading', 'true');
    });

    test('checked=true → data-checked=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ checked: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-checked', 'true');
    });
  });
});
