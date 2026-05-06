import { expect, test } from '#playwright-tooling/fixtures';

import { APPEARANCE, CHEVRON, VIEW } from '../../src/constants';
import {
  AFTER_TITLE_TEST_ID,
  buildStoryOptions,
  COLLAPSE_BLOCK_TEST_ID,
  CONTENT_TEST_ID,
  SUBTITLE_TEST_ID,
  TITLE_TEST_ID,
} from './helpers';

test.describe('CollapseBlockPrimary — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toBeVisible();
      await expect(getByTestId(TITLE_TEST_ID)).toBeVisible();
    });

    test('renders title text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ title: 'Custom title' }));

      await expect(getByTestId(TITLE_TEST_ID)).toContainText('Custom title');
    });

    test('renders subTitle when provided', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ subTitle: 'Custom subtitle' }));

      await expect(getByTestId(SUBTITLE_TEST_ID)).toContainText('Custom subtitle');
    });

    test('renders afterTitle slot when enabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showAfterTitleSlot: true }));

      await expect(getByTestId(AFTER_TITLE_TEST_ID)).toBeVisible();
    });

    test('hides afterTitle slot when disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showAfterTitleSlot: false }));

      await expect(getByTestId(AFTER_TITLE_TEST_ID)).toHaveCount(0);
    });

    test('content is hidden in DOM by default (keepMounted=false)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ keepMounted: false }));

      await expect(getByTestId(CONTENT_TEST_ID)).toHaveCount(0);
    });

    test('content is mounted when keepMounted=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ keepMounted: true, children: 'Hello content' }));

      await expect(getByTestId(CONTENT_TEST_ID)).toContainText('Hello content');
    });
  });

  test.describe('props propagation', () => {
    for (const view of Object.values(VIEW)) {
      test(`view=${view}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ view }));

        await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-view', view);
      });
    }

    for (const appearance of Object.values(APPEARANCE)) {
      test(`appearance=${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance }));

        await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-acrylic-appearance', appearance);
      });
    }

    for (const chevron of Object.values(CHEVRON)) {
      test(`chevron=${chevron}`, async ({ gotoStory, getByTestId, page }) => {
        await gotoStory(buildStoryOptions({ chevron }));

        await expect(page.locator(`[data-chevron="${chevron}"]`)).toBeVisible();
        await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toBeVisible();
      });
    }

    test('data-component=accordionPrimary', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-component', 'accordionPrimary');
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ className: 'custom-collapse' }));

      await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveClass(/custom-collapse/);
    });
  });

  test.describe('states', () => {
    test('collapsed by default — data-expanded=false', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-expanded', 'false');
    });
  });
});
