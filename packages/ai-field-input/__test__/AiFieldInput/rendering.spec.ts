import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiFieldInput — rendering', () => {
  test('renders field parts', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.banner)).toBeVisible();
    await expect(getByTestId(TEST_IDS.attachments)).toBeVisible();
    await expect(getByTestId(TEST_IDS.editor)).toBeVisible();
    await expect(getByTestId(TEST_IDS.scrollButton)).toBeVisible();
    await expect(getByTestId(TEST_IDS.send)).toHaveAttribute('data-state', 'disabled');
    await expect(getByTestId(TEST_IDS.disclaimer)).not.toBeEmpty();
  });

  test('props propagation', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.root);

    await test.step('disabled hides attachments and disables footer', async () => {
      await setStoryArgs({ disabled: true });
      await expect(root).toHaveAttribute('data-disabled', 'true');
      await expect(getByTestId(TEST_IDS.attachments)).toHaveCount(0);
      await expect(getByTestId(TEST_IDS.plus)).toBeDisabled();
      await expect(getByTestId(TEST_IDS.context)).toBeEnabled();
    });

    await test.step('disclaimer=null keeps the slot empty', async () => {
      await setStoryArgs({ disabled: false, disclaimer: null });
      await expect(getByTestId(TEST_IDS.disclaimer)).toBeEmpty();
    });

    for (const sendState of ['loading', 'stop'] as const) {
      await test.step(`send state ${sendState}`, async () => {
        await setStoryArgs({ sendState });
        await expect(getByTestId(TEST_IDS.send)).toHaveAttribute('data-state', sendState);
      });
    }

    for (const [contextValue, progress] of [
      [50, 'green'],
      [80, 'orange'],
      [95, 'red'],
    ] as const) {
      await test.step(`context ${contextValue} → ${progress}`, async () => {
        await setStoryArgs({ contextValue });
        await expect(getByTestId(TEST_IDS.context)).toHaveAttribute('data-progress', progress);
      });
    }
  });
});
