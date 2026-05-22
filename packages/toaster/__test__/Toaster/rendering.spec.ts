import { STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  TEST_IDS,
  TOASTER_KEY_COMBOS,
  TOASTER_STORIES,
  TOASTER_TYPE_KEY_VALUES,
  ToasterStoryRef,
} from './helpers';

test.describe('Toaster — rendering', () => {
  test.describe('stories load', () => {
    const refs = Array.from(
      new Map(Object.values(TOASTER_STORIES).map(r => [`${r.name}--${r.story}`, r])).values(),
    ) as ToasterStoryRef[];
    for (const ref of refs) {
      test(`story "${ref.name}--${ref.story}" renders without errors`, async ({ page, gotoStory }) => {
        await gotoStory(buildStoryOptions(undefined, ref));
        await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toBeAttached();
        await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).not.toBeEmpty();
      });
    }
  });

  test.describe('container mount', () => {
    test('Playground renders ToasterContainer with default data-test-id', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TOASTER_STORIES.playground));
      await expect(getByTestId(TEST_IDS.toasterContainer).first()).toBeAttached();
    });
  });

  test.describe('props propagation', () => {
    // Параметризация по ключевой выборке позиций — по 1 представителю каждой
    // top/bottom × left/right комбинации. Полная матрица позиций — в VisualMatrix.
    for (const { position } of TOASTER_KEY_COMBOS) {
      test(`position=${position} propagates to data-position`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ position }, TOASTER_STORIES.playground));
        await expect(getByTestId(TEST_IDS.toasterContainer).first()).toHaveAttribute('data-position', position);
      });
    }

    test('stacked=true propagates to data-stacked', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ stacked: true }, TOASTER_STORIES.playground));
      await expect(getByTestId(TEST_IDS.toasterContainer).first()).toHaveAttribute('data-stacked', 'true');
    });

    // Ключевая выборка значений type — по 1 представителю каждого варианта.
    for (const type of TOASTER_TYPE_KEY_VALUES) {
      test(`type=${type} propagates to data-type`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ type }, TOASTER_STORIES.playground));
        await expect(getByTestId(TEST_IDS.toasterContainer).first()).toHaveAttribute('data-type', type);
      });
    }
  });
});
