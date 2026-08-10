import { expect, test } from '#playwright-tooling/fixtures';

import { ORIENTATION } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('DropIndicator — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const root = getByTestId(TEST_IDS.dropIndicator);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('role', 'presentation');
    await expect(root).toHaveAttribute('data-orientation', ORIENTATION.Horizontal);
  });

  test('props propagation: orientation=vertical', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ orientation: ORIENTATION.Vertical }));

    await expect(getByTestId(TEST_IDS.dropIndicator)).toHaveAttribute('data-orientation', ORIENTATION.Vertical);
  });
});
