import { expect, test } from '#playwright-tooling/fixtures';

import { AI_TOOL_DETAILS_HEIGHT } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiToolDetails — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('state propagates to data-state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ state: 'error' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-state', 'error');
  });

  test.describe('props propagation', () => {
    for (const height of Object.values(AI_TOOL_DETAILS_HEIGHT)) {
      test(`height=${height}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ height }));
        await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-height', height);
      });
    }
  });

  test('shows copy button only when enabled with a non-empty content value', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ copyValue: 'TextBlock Text', showCopyButton: true }));
    await expect(getByTestId(TEST_IDS.copy)).toBeVisible();

    await gotoStory(buildStoryOptions({ copyValue: 'TextBlock Text', showCopyButton: false }));
    await expect(getByTestId(TEST_IDS.copy)).toHaveCount(0);

    await gotoStory(buildStoryOptions({ copyValue: '', showCopyButton: true }));
    await expect(getByTestId(TEST_IDS.copy)).toHaveCount(0);
  });
});
