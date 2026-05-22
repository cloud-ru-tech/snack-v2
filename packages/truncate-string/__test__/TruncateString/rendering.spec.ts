import { expect, test } from '#playwright-tooling/fixtures';

import { VARIANT } from '../../src/constants';
import { buildStoryOptions, KEY_VARIANTS, TEST_IDS } from './helpers';

test.describe('TruncateString — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('renders provided text', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ text: 'Custom text content' }));

    await expect(getByTestId(TEST_IDS.root)).toContainText('Custom text content');
  });

  test('props propagation across key variants', async ({ gotoStory, getByTestId }) => {
    for (const variant of KEY_VARIANTS) {
      await gotoStory(buildStoryOptions({ variant }));
      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
      // Middle variant renders fullText/truncatedText slots; End variant does not.
      if (variant === VARIANT.Middle) {
        await expect(getByTestId(TEST_IDS.fullText)).toBeAttached();
        await expect(getByTestId(TEST_IDS.truncatedText)).toBeAttached();
      } else {
        await expect(getByTestId(TEST_IDS.fullText)).toHaveCount(0);
      }
    }
  });
});
