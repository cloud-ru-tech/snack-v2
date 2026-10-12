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

  test.describe('icon and children slots in VisualMatrix', () => {
    test('icon renders into TEST_IDS.icon', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, TITLE_CLICKABLE_STORIES.visualMatrix));

      await expect(page.getByTestId(TEST_IDS.icon).first()).toBeVisible();
    });

    test('custom children node is rendered as-is', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TITLE_CLICKABLE_STORIES.visualMatrix));

      await expect(getByTestId(STORY_TEST_IDS.customChildren).first()).toContainText('Custom children');
    });
  });

  test.describe('avatar slot in VisualMatrix', () => {
    test('renders avatar + label + subtitle', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, TITLE_CLICKABLE_STORIES.visualMatrix));

      await expect(page.getByTestId(TEST_IDS.avatar).first()).toBeVisible();
      await expect(page.getByTestId(TEST_IDS.avatarLabel).last()).toContainText('John Doe');
      await expect(page.getByTestId(TEST_IDS.avatarSubtitle).last()).toContainText('jdoe@example.com');
    });
  });
});

test('UserTitle hides absent subtitle', async ({ gotoStory, page }) => {
  await gotoStory(buildStoryOptions(undefined, TITLE_CLICKABLE_STORIES.visualMatrix));
  const user = page
    .getByTestId(TEST_IDS.content)
    .filter({ has: page.getByTestId(TEST_IDS.avatar) })
    .first();
  await expect(user.getByTestId(TEST_IDS.avatarSubtitle)).toHaveCount(0);
});

test('fullWidth keeps arrow on the right and long content inside container', async ({ gotoStory, page }) => {
  await gotoStory(buildStoryOptions({ fullWidth: true, title: 'Long title '.repeat(30), showIcon: true }));
  const root = page.getByTestId(TEST_IDS.root);
  const rootBox = await root.boundingBox();
  const arrowBox = await root.getByTestId(TEST_IDS.chevron).boundingBox();
  expect(rootBox).not.toBeNull();
  expect(arrowBox).not.toBeNull();
  if (!rootBox || !arrowBox) throw new Error('Expected visible title and arrow');
  expect(Math.abs(rootBox.x + rootBox.width - (arrowBox.x + arrowBox.width))).toBeLessThan(1);
  expect(await root.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
});

test('titleTag controls title semantics without setting a native title attribute', async ({ gotoStory, page }) => {
  await gotoStory(buildStoryOptions({ title: 'Section', titleTag: 'h2' }));
  await expect(page.getByRole('heading', { name: 'Section', level: 2 })).toBeVisible();
  await expect(page.getByTestId(TEST_IDS.root)).not.toHaveAttribute('title');
});

test('standalone content owns its className and support props', async ({ gotoStory, page }) => {
  await gotoStory(buildStoryOptions(undefined, TITLE_CLICKABLE_STORIES.visualMatrix));
  const simple = page.getByTestId('standalone-simple');
  const user = page.getByTestId('standalone-user');
  await expect(simple).toHaveClass(/custom-simple/);
  await expect(simple).toHaveAttribute('aria-label', 'Simple title');
  await expect(user).toHaveClass(/custom-user/);
  await expect(user).toHaveAttribute('aria-label', 'User title');
  await expect(user.getByTestId(TEST_IDS.avatar)).not.toHaveAttribute('aria-label');
  expect(await simple.evaluate(element => element.closest('a'))).toBeNull();
  expect(await user.evaluate(element => element.closest('a'))).toBeNull();
});
