import { expect, test } from '#playwright-tooling/fixtures';

import { APPEARANCE_TO_THEME_COLOR, buildStoryOptions, KEY_APPEARANCES, KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('Alert — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.alert.root)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { size, align, appearance } of KEY_COMBOS) {
      test(`size=${size}, align=${align}, appearance=${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, align, appearance }));

        const root = getByTestId(TEST_IDS.alert.root);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-align', align);
        await expect(root).toHaveAttribute('data-color', APPEARANCE_TO_THEME_COLOR[appearance]);
      });
    }

    for (const appearance of KEY_APPEARANCES) {
      test(`appearance=${appearance} → data-color=${APPEARANCE_TO_THEME_COLOR[appearance]}`, async ({
        gotoStory,
        getByTestId,
      }) => {
        await gotoStory(buildStoryOptions({ appearance }));
        await expect(getByTestId(TEST_IDS.alert.root)).toHaveAttribute(
          'data-color',
          APPEARANCE_TO_THEME_COLOR[appearance],
        );
      });
    }

    test('outline=true → data-outline', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ outline: true }));

      await expect(getByTestId(TEST_IDS.alert.root)).toHaveAttribute('data-outline', 'true');
    });
  });

  test.describe('states', () => {
    test('icon=false → no icon rendered (still data-variant=inline)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ icon: false }));

      await expect(getByTestId(TEST_IDS.alert.root)).toHaveAttribute('data-variant', 'inline');
    });
  });
});
