import { expect, test } from '#playwright-tooling/fixtures';

import { SWITCH_ROW_TYPES } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

const SWITCH_ROW_KEY_COMBOS = [{ type: SWITCH_ROW_TYPES.Block }, { type: SWITCH_ROW_TYPES.Line }] as const;

test.describe('SwitchRow — rendering', () => {
  test('render, props propagation and states', async ({ gotoStory, getByTestId, setStoryArgs, remountStory }) => {
    await gotoStory(buildStoryOptions());

    const root = getByTestId(TEST_IDS.root);

    await test.step('render: default props', async () => {
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute('role', 'switch');
      await expect(root).toHaveAttribute('tabindex', '0');
    });

    await test.step('render: title text', async () => {
      await setStoryArgs({ title: 'Hello title' });
      await expect(root).toContainText('Hello title');
    });

    await test.step('render: description when provided', async () => {
      await setStoryArgs({ description: 'Some description' });
      await expect(getByTestId(TEST_IDS.description)).toContainText('Some description');
    });

    for (const combo of SWITCH_ROW_KEY_COMBOS) {
      await test.step(`props propagation: type=${combo.type}`, async () => {
        await setStoryArgs({ type: combo.type });
        await expect(root).toHaveAttribute('data-type', combo.type);
      });
    }

    await test.step('props propagation: name → native input', async () => {
      await setStoryArgs({ name: 'notifications' });
      await expect(getByTestId(`${TEST_IDS.switch}-native-input`)).toHaveAttribute('name', 'notifications');
    });

    await test.step('states: defaultChecked=true → aria-checked=true', async () => {
      // `defaultChecked` читается только на маунте — нужен ремаунт, а не смена args.
      await setStoryArgs({ defaultChecked: true, checked: undefined });
      await remountStory();
      await expect(root).toHaveAttribute('aria-checked', 'true');
    });

    await test.step('states: checked=true (controlled) → aria-checked / data-checked', async () => {
      await setStoryArgs({ defaultChecked: undefined, checked: true });
      await expect(root).toHaveAttribute('aria-checked', 'true');
      await expect(root).toHaveAttribute('data-checked', 'true');
    });

    await test.step('states: checked=false (controlled) → aria-checked=false', async () => {
      await setStoryArgs({ checked: false });
      await expect(root).toHaveAttribute('aria-checked', 'false');
    });

    await test.step('states: disabled → data-disabled=true, tabIndex=-1', async () => {
      await setStoryArgs({ disabled: true });
      await expect(root).toHaveAttribute('data-disabled', 'true');
      await expect(root).toHaveAttribute('tabindex', '-1');
    });

    await test.step('states: loading → data-loading=true', async () => {
      await setStoryArgs({ disabled: undefined, loading: true });
      await expect(root).toHaveAttribute('data-loading', 'true');
    });
  });
});
