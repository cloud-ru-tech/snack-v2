import { expect, test } from '#playwright-tooling/fixtures';

import { CHEVRON } from '../../src/constants';
import { buildStoryOptions, PLAYGROUND_DEFAULT_ARGS, TEST_IDS } from './helpers';

const KEY_CHEVRONS = [CHEVRON.Before, CHEVRON.After] as const;

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

  test('chevron placement propagates to data-chevron', async ({ gotoStory, page }) => {
    for (const chevron of KEY_CHEVRONS) {
      await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, chevron }));
      await expect(page.locator(`[data-chevron="${chevron}"]`)).toBeVisible();
    }
  });

  test('expands on title click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, children: 'Tertiary content' }));

    await getByTestId(TEST_IDS.title).click();

    await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-expanded', 'true');
    await expect(getByTestId(TEST_IDS.content)).toContainText('Tertiary content');
  });
});
