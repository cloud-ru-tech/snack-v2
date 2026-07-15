import { expect, test } from '#playwright-tooling/fixtures';

import { CHEVRON_POSITION } from '../../src/constants';
import { buildStoryOptions, PLAYGROUND_DEFAULT_ARGS, TEST_IDS } from './helpers';

const KEY_CHEVRON_POSITIONS = [CHEVRON_POSITION.Before, CHEVRON_POSITION.After] as const;

test.describe('CollapseBlockTertiary — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

    await expect(getByTestId(TEST_IDS.collapseBlock)).toBeVisible();
    await expect(getByTestId(TEST_IDS.title)).toBeVisible();
  });

  test('data-component=accordionTertiary', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

    await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-component', 'accordionTertiary');
  });

  test('chevron placement propagates to data-chevron-position', async ({ gotoStory, page }) => {
    for (const chevronPosition of KEY_CHEVRON_POSITIONS) {
      await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, chevronPosition }));
      await expect(page.locator(`[data-chevron-position="${chevronPosition}"]`)).toBeVisible();
    }
  });

  test('expands on title click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, children: 'Tertiary content' }));

    await getByTestId(TEST_IDS.title).click();

    await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-expanded', 'true');
    await expect(getByTestId(TEST_IDS.content)).toContainText('Tertiary content');
  });
});
