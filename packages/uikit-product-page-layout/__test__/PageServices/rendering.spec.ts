import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  INTERNAL_TEST_IDS,
  PAGE_SERVICES_LAYOUTS,
  PAGE_SERVICES_STORIES,
  PAGE_SERVICES_TEST_ID,
  TEST_IDS,
} from './helpers';

/** gap контейнера mobile-действий (`Actions/styles.module.scss`: `base.$sn-primitive-dimension-8`). */
const MOBILE_ACTIONS_GAP = 8;

test.describe('PageServices — rendering', () => {
  test('playground renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(PAGE_SERVICES_TEST_ID)).toBeVisible();
  });

  // Обе раскладки монтируются (desktop → PageServices, mobile → MobilePageServices).
  test.describe('layoutType', () => {
    for (const layoutType of PAGE_SERVICES_LAYOUTS) {
      test(`renders root in ${layoutType}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions(undefined, PAGE_SERVICES_STORIES.playground, { layoutType }));
        await expect(getByTestId(PAGE_SERVICES_TEST_ID)).toBeVisible();
      });
    }
  });

  // Action-ссылка (`as='a'` + `href`) рендерится нативным анкором: работают средняя кнопка,
  // «копировать адрес ссылки», контекстное меню. `rel` при `target='_blank'` проставляет `Button`.
  test('action with as=a renders native anchor', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const link = getByTestId(TEST_IDS.pageServices.linkAction);

    await expect(link).toBeVisible();
    await expect(link).toHaveJSProperty('tagName', 'A');
    await expect(link).toHaveAttribute('href', 'https://cloud.ru/docs');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // Регрессия: action с `tooltip` остаётся прямым flex-потомком контейнера действий
  // (`ActionView` рендерит `Tooltip` с `disableSpanWrapper`). Со span-обёрткой `flex: 0 1 auto`
  // перебивает `fullWidth`-кнопку, и она сжимается по контенту вместо остатка строки.
  test('mobile: action with tooltip fills the actions row', async ({ page, gotoStory, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, PAGE_SERVICES_STORIES.playground, { layoutType: 'mobile' }));

    const row = getByTestId(INTERNAL_TEST_IDS.mobileActions.root);
    const action = getByTestId(TEST_IDS.pageServices.primaryAction);
    const kebab = getByTestId(INTERNAL_TEST_IDS.mobileActions.trigger);

    await expect(action).toBeVisible();
    await expect(kebab).toBeVisible();

    const [rowBox, actionBox, kebabBox] = await Promise.all([
      row.boundingBox(),
      action.boundingBox(),
      kebab.boundingBox(),
    ]);

    expect(actionBox?.width).toBeCloseTo((rowBox?.width ?? 0) - (kebabBox?.width ?? 0) - MOBILE_ACTIONS_GAP, 0);
  });
});
