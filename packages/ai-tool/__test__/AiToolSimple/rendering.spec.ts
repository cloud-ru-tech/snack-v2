import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiToolSimple — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.icon)).toBeVisible();
    await expect(getByTestId(TEST_IDS.header)).toBeVisible();
    await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
    await expect(getByTestId(TEST_IDS.connector)).toHaveCount(0);
  });

  test('state and connector propagate from props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ state: 'success', connector: true }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-state', 'success');
    await expect(getByTestId(TEST_IDS.connector)).toHaveCount(1);
  });

  test('state=loading swaps the type icon for a status indicator', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ state: 'loading' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-state', 'loading');
    await expect(getByTestId(TEST_IDS.status)).toBeVisible();
    await expect(getByTestId(TEST_IDS.icon)).toHaveCount(0);
  });

  test('opened=true reveals description and content', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ opened: true }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-opened', 'true');
    await expect(getByTestId(TEST_IDS.description)).toBeVisible();
    await expect(getByTestId(TEST_IDS.content)).toBeVisible();
    await expect(getByTestId(TEST_IDS.chevron)).toHaveAttribute('aria-expanded', 'true');
  });

  test('falsy description and children=none render no blocks', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ opened: true, description: '', children: 'none' }));
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.description)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.content)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.chevron)).toHaveCount(0);
  });
});
