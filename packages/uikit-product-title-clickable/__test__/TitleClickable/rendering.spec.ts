import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  TITLE_CLICKABLE_AVATAR_LABEL_TEST_ID,
  TITLE_CLICKABLE_AVATAR_SUBTITLE_TEST_ID,
  TITLE_CLICKABLE_AVATAR_TEST_ID,
  TITLE_CLICKABLE_CHEVRON_TEST_ID,
  TITLE_CLICKABLE_ICON_TEST_ID,
  TITLE_CLICKABLE_STORIES,
  TITLE_CLICKABLE_TEST_ID,
  TITLE_CLICKABLE_TITLE_TEST_ID,
} from './helpers';

test.describe('TitleClickable — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TITLE_CLICKABLE_TEST_ID)).toBeVisible();
    });

    test('renders title text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ title: 'Hello World' }));

      await expect(getByTestId(TITLE_CLICKABLE_TITLE_TEST_ID)).toContainText('Hello World');
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ className: 'custom-tc' }));

      await expect(getByTestId(TITLE_CLICKABLE_TEST_ID)).toHaveClass(/custom-tc/);
    });
  });

  test.describe('props propagation', () => {
    test('fullWidth=true → data-full-width', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ fullWidth: true }));

      await expect(getByTestId(TITLE_CLICKABLE_TEST_ID)).toHaveAttribute('data-full-width', 'true');
    });

    test('fullWidth=false → no data-full-width', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ fullWidth: false }));

      const root = getByTestId(TITLE_CLICKABLE_TEST_ID);
      const hasAttr = await root.evaluate(el => el.hasAttribute('data-full-width'));
      expect(hasAttr).toBe(false);
    });

    test('href propagated to anchor', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ href: 'test' }));

      await expect(getByTestId(TITLE_CLICKABLE_TEST_ID)).toHaveAttribute('href', 'test');
    });

    test('target propagated to anchor', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ href: '#', target: '_self' }));

      await expect(getByTestId(TITLE_CLICKABLE_TEST_ID)).toHaveAttribute('target', '_self');
    });
  });

  test.describe('slots', () => {
    test('showArrow=true renders chevron', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showArrow: true }));

      await expect(getByTestId(TITLE_CLICKABLE_CHEVRON_TEST_ID)).toBeVisible();
    });

    test('showArrow=false hides chevron', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions({ showArrow: false }));

      await expect(page.locator(`[data-test-id="${TITLE_CLICKABLE_CHEVRON_TEST_ID}"]`)).toHaveCount(0);
    });
  });

  test.describe('before slot — presets in VisualMatrix', () => {
    test('TitleClickableIcon preset renders into TEST_IDS.icon', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, TITLE_CLICKABLE_STORIES.visualMatrix));

      await expect(page.locator(`[data-test-id="${TITLE_CLICKABLE_ICON_TEST_ID}"]`).first()).toBeVisible();
    });

    test('TitleClickableAvatar preset renders avatar + label + subtitle', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, TITLE_CLICKABLE_STORIES.visualMatrix));

      await expect(page.locator(`[data-test-id="${TITLE_CLICKABLE_AVATAR_TEST_ID}"]`).first()).toBeVisible();
      await expect(page.locator(`[data-test-id="${TITLE_CLICKABLE_AVATAR_LABEL_TEST_ID}"]`).first()).toContainText(
        'John Doe',
      );
      await expect(page.locator(`[data-test-id="${TITLE_CLICKABLE_AVATAR_SUBTITLE_TEST_ID}"]`).first()).toContainText(
        'jdoe@example.com',
      );
    });

    test('custom node in `before` is rendered as-is', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, TITLE_CLICKABLE_STORIES.visualMatrix));

      await expect(page.locator('[data-test-id="custom-before"]')).toContainText('Custom before');
    });
  });
});
