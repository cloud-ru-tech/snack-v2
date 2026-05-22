import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, STORY_TEST_IDS, TEST_IDS, TITLE_CLICKABLE_STORIES } from './helpers';

test.describe('TitleClickable — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders title text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ title: 'Hello World' }));

      await expect(getByTestId(TEST_IDS.title)).toContainText('Hello World');
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ className: 'custom-tc' }));

      await expect(getByTestId(TEST_IDS.root)).toHaveClass(/custom-tc/);
    });
  });

  test.describe('props propagation', () => {
    test('fullWidth=true → data-full-width', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ fullWidth: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-full-width', 'true');
    });

    test('fullWidth=false → no data-full-width', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ fullWidth: false }));

      const root = getByTestId(TEST_IDS.root);
      const hasAttr = await root.evaluate(el => el.hasAttribute('data-full-width'));
      expect(hasAttr).toBe(false);
    });

    test('href propagated to anchor', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ href: 'test' }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('href', 'test');
    });

    test('target propagated to anchor', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ href: '#', target: '_self' }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('target', '_self');
    });
  });

  test.describe('slots', () => {
    test('showArrow=true renders chevron', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showArrow: true }));

      await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
    });

    test('showArrow=false hides chevron', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions({ showArrow: false }));

      await expect(page.locator(`[data-test-id="${TEST_IDS.chevron}"]`)).toHaveCount(0);
    });
  });

  test.describe('before slot — presets in VisualMatrix', () => {
    test('TitleClickableIcon preset renders into TEST_IDS.icon', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, TITLE_CLICKABLE_STORIES.visualMatrix));

      await expect(page.locator(`[data-test-id="${TEST_IDS.icon}"]`).first()).toBeVisible();
    });

    test('TitleClickableAvatar preset renders avatar + label + subtitle', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, TITLE_CLICKABLE_STORIES.visualMatrix));

      await expect(page.locator(`[data-test-id="${TEST_IDS.avatar}"]`).first()).toBeVisible();
      await expect(page.locator(`[data-test-id="${TEST_IDS.avatarLabel}"]`).first()).toContainText('John Doe');
      await expect(page.locator(`[data-test-id="${TEST_IDS.avatarSubtitle}"]`).first()).toContainText(
        'jdoe@example.com',
      );
    });

    test('custom node in `before` is rendered as-is', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TITLE_CLICKABLE_STORIES.visualMatrix));

      await expect(getByTestId(STORY_TEST_IDS.customBefore).first()).toContainText('Custom before');
    });
  });
});
