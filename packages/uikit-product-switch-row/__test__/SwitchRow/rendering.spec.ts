import { expect, test } from '#playwright-tooling/fixtures';

import { SWITCH_ROW_TYPES } from '../../src/constants';
import {
  buildStoryOptions,
  SWITCH_ROW_DESCRIPTION_TEST_ID,
  SWITCH_ROW_SWITCH_TEST_ID,
  SWITCH_ROW_TEST_ID,
} from './helpers';

test.describe('SwitchRow — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(SWITCH_ROW_TEST_ID)).toBeVisible();
    });

    test('renders title text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ title: 'Hello title' }));

      await expect(getByTestId(SWITCH_ROW_TEST_ID)).toContainText('Hello title');
    });

    test('renders description when provided', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ description: 'Some description' }));

      await expect(getByTestId(SWITCH_ROW_DESCRIPTION_TEST_ID)).toContainText('Some description');
    });

    test('root has role=switch', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(SWITCH_ROW_TEST_ID)).toHaveAttribute('role', 'switch');
    });
  });

  test.describe('props propagation', () => {
    for (const type of Object.values(SWITCH_ROW_TYPES)) {
      test(`type=${type}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ type }));

        await expect(getByTestId(SWITCH_ROW_TEST_ID)).toHaveAttribute('data-type', type);
      });
    }

    test('name prop propagates to native input', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ name: 'notifications' }));

      await expect(getByTestId(`${SWITCH_ROW_SWITCH_TEST_ID}-native-input`)).toHaveAttribute('name', 'notifications');
    });
  });

  test.describe('states', () => {
    test('defaultChecked=true → aria-checked=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ defaultChecked: true }));

      await expect(getByTestId(SWITCH_ROW_TEST_ID)).toHaveAttribute('aria-checked', 'true');
    });

    test('checked=true (controlled) → aria-checked=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ checked: true }));

      await expect(getByTestId(SWITCH_ROW_TEST_ID)).toHaveAttribute('aria-checked', 'true');
    });

    test('checked=false (controlled) → aria-checked=false', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ checked: false }));

      await expect(getByTestId(SWITCH_ROW_TEST_ID)).toHaveAttribute('aria-checked', 'false');
    });

    test('disabled → data-disabled=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(SWITCH_ROW_TEST_ID)).toHaveAttribute('data-disabled', 'true');
    });

    test('disabled → tabIndex=-1', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(SWITCH_ROW_TEST_ID)).toHaveAttribute('tabindex', '-1');
    });

    test('enabled → tabIndex=0', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(SWITCH_ROW_TEST_ID)).toHaveAttribute('tabindex', '0');
    });

    test('loading → data-loading=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true }));

      await expect(getByTestId(SWITCH_ROW_TEST_ID)).toHaveAttribute('data-loading', 'true');
    });

    test('checked=true → data-checked=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ checked: true }));

      await expect(getByTestId(SWITCH_ROW_TEST_ID)).toHaveAttribute('data-checked', 'true');
    });
  });
});
