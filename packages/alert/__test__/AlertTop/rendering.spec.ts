import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, KEY_APPEARANCES, TEST_IDS } from './helpers';

test.describe('AlertTop — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.alertTop.root)).toBeVisible();
    });

    test('has data-variant=top', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.alertTop.root)).toHaveAttribute('data-variant', 'top');
    });
  });

  test.describe('props propagation', () => {
    test('appearance propagation covers all key values', async ({ gotoStory, getByTestId }) => {
      for (const appearance of KEY_APPEARANCES) {
        await gotoStory(buildStoryOptions({ appearance }));

        await expect(getByTestId(TEST_IDS.alertTop.root)).toHaveAttribute('data-appearance', appearance);
      }
    });
  });

  // Функциональная проверка preset-defaults адаптива (не визуальная): `collapsible` резолвится из
  // тулбар-глобала `layoutType` через ALERT_TOP_LAYOUT_PRESETS (mobile=true, desktop=false). При
  // длинном описании collapsible=true даёт expandingIcon; desktop остаётся плоским. Длинное описание
  // гарантирует canExpand на узком экране.
  test.describe('adaptive preset defaults (collapsible)', () => {
    // Кириллица в URL-args не резолвится Storybook'ом (падает на дефолт) — см. test-environment-pitfalls.md.
    const LONG_DESCRIPTION =
      'Long notification description that deliberately exceeds the collapsed height on a narrow mobile ' +
      'viewport and therefore makes the alert expandable. Details expand on click on the alert as a whole. ' +
      'Extra padding text to guarantee container overflow and the appearance of the chevron icon.';

    test('desktop layout keeps alert flat (no expand chevron)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ content: LONG_DESCRIPTION }, undefined, { layoutType: 'desktop' }));
      await expect(getByTestId(TEST_IDS.alertTop.root)).toBeVisible();
      await expect(getByTestId(TEST_IDS.alertTop.expandingIcon)).toHaveCount(0);
    });

    test('mobile layout resolves collapsible=true (expand chevron present)', async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions({ content: LONG_DESCRIPTION }, undefined, { layoutType: 'mobile' }));
      await expect(getByTestId(TEST_IDS.alertTop.root)).toBeVisible();
      await expect(getByTestId(TEST_IDS.alertTop.expandingIcon)).toBeVisible();
    });
  });
});
