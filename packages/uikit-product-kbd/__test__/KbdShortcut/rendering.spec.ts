import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('KbdShortcut — rendering', () => {
  test('renders and propagates props', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions({ platform: 'mac' }));
    const root = getByTestId(TEST_IDS.root);

    await test.step('platform=mac → nested <kbd>, ⌘ + K, one accessible name', async () => {
      await expect(root).toBeVisible();
      await expect(root).toHaveJSProperty('tagName', 'KBD');
      await expect(root).toHaveAttribute('data-platform', 'mac');
      await expect(root.locator('kbd')).toHaveCount(2);
      await expect(root).toContainText('⌘');
      await expect(root).toContainText('Command + K');
    });

    await test.step('platform=other → Ctrl + Control', async () => {
      await setStoryArgs({ platform: 'other' });
      await expect(root).toHaveAttribute('data-platform', 'other');
      await expect(root).toContainText('Ctrl');
      await expect(root).toContainText('Control + K');
    });

    await test.step('aria-label → replaces the generated name, not an attribute', async () => {
      await setStoryArgs({ keys: ['mod', 'shift', 'P'], 'aria-label': 'Палитра команд' });
      await expect(root.locator('kbd')).toHaveCount(3);
      await expect(root).toContainText('Палитра команд');
      await expect(root).not.toHaveAttribute('aria-label');
    });
  });
});
