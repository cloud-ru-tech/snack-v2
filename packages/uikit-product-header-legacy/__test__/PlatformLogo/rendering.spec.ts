import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PLATFORM_LOGO_KEY_COMBOS, PLATFORM_LOGO_STORIES, TEST_IDS } from './helpers';

test.describe('PlatformLogo — rendering', () => {
  test.describe('render', () => {
    test('renders root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('visual matrix mounts', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, PLATFORM_LOGO_STORIES.visualMatrix));
      await expect(getByTestId(TEST_IDS.root).first()).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { variant, compact } of PLATFORM_LOGO_KEY_COMBOS) {
      test(`variant=${variant} compact=${compact}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ variant, compact }));
        const root = getByTestId(TEST_IDS.root);
        await expect(root).toHaveAttribute('data-variant', variant);
        if (compact) {
          await expect(root).toHaveAttribute('data-compact', 'true');
        } else {
          await expect(root).not.toHaveAttribute('data-compact');
        }
      });
    }
  });
});
