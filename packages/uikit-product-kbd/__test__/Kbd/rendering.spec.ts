import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Kbd — rendering', () => {
  test('renders and propagates props', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.root);

    await test.step('default: <kbd> outside tab order', async () => {
      await expect(root).toBeVisible();
      await expect(root).toHaveJSProperty('tagName', 'KBD');
      await expect(root).not.toHaveAttribute('tabindex');
      await expect(root).toHaveText('K');
    });

    await test.step('keyName=mod, platform=mac → ⌘ + Command', async () => {
      await setStoryArgs({ keyName: 'mod', platform: 'mac' });
      await expect(root).toHaveAttribute('data-key-name', 'mod');
      await expect(root).toHaveAttribute('data-platform', 'mac');
      await expect(root).toContainText('⌘');
      await expect(root).toContainText('Command');
    });

    await test.step('keyName=mod, platform=other → Ctrl + Control', async () => {
      await setStoryArgs({ platform: 'other' });
      await expect(root).toHaveAttribute('data-platform', 'other');
      await expect(root).toContainText('Ctrl');
      await expect(root).toContainText('Control');
    });

    await test.step('keyName=up → localized accessible name', async () => {
      await setStoryArgs({ keyName: 'up', platform: undefined });
      await expect(root).toContainText('↑');
      await expect(root).toContainText(/Up arrow|Стрелка вверх/);
    });

    await test.step('aria-label → visually hidden text, not an attribute', async () => {
      await setStoryArgs({ keyName: undefined, children: '/', 'aria-label': 'Слэш' });
      await expect(root).toContainText('Слэш');
      await expect(root).not.toHaveAttribute('aria-label');
      await expect(root).not.toHaveAttribute('data-key-name');
    });
  });
});
