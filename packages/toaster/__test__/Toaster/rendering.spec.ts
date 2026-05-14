import { STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TOASTER_CONTAINER_TEST_ID, TOASTER_STORIES, ToasterStoryId } from './helpers';

test.describe('Toaster — rendering', () => {
  test.describe('stories load', () => {
    for (const story of Array.from(new Set(Object.values(TOASTER_STORIES))) as ToasterStoryId[]) {
      test(`story "${story}" renders without errors`, async ({ page, gotoStory }) => {
        await gotoStory(buildStoryOptions(story));
        // Storybook root всегда есть; убеждаемся, что страница story отрендерила хоть какую-то разметку
        await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toBeAttached();
        await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).not.toBeEmpty();
      });
    }
  });

  test.describe('container mount', () => {
    test('Playground renders ToasterContainer with default data-test-id', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.playground));
      // Контейнер монтируется через портал в document.body; getByTestId ищет глобально.
      await expect(getByTestId(TOASTER_CONTAINER_TEST_ID).first()).toBeAttached();
    });
  });

  test.describe('props propagation', () => {
    const POSITIONS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;

    for (const position of POSITIONS) {
      test(`position=${position} propagates to data-position`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions(TOASTER_STORIES.playground, { position }));
        await expect(getByTestId(TOASTER_CONTAINER_TEST_ID).first()).toHaveAttribute('data-position', position);
      });
    }

    test('stacked=true propagates to data-stacked', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.playground, { stacked: true }));
      await expect(getByTestId(TOASTER_CONTAINER_TEST_ID).first()).toHaveAttribute('data-stacked', 'true');
    });

    test('type=systemEvent propagates to data-type', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.playground, { type: 'systemEvent' }));
      await expect(getByTestId(TOASTER_CONTAINER_TEST_ID).first()).toHaveAttribute('data-type', 'systemEvent');
    });
  });
});
