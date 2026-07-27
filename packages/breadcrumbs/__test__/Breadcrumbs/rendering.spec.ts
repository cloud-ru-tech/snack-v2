import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import { buildStoryOptions, getTextView, TEST_IDS } from './helpers';

test.describe('Breadcrumbs — rendering', () => {
  test.describe('render', () => {
    test('renders root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders all items in full mode by default', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions());

      // Раскладка breadcrumbs пересчитывается через debounce + ResizeObserver,
      // поэтому читаем DOM с ретраями (web-first assertion), а не одним снимком.
      await expect
        .poll(() => getTextView(page))
        .toEqual(
          '[FULL: Литература]/[FULL: Стихи]/[FULL: Золотой век русской поэзии]/[FULL: Михаил Лермонтов]/[FULL: Тема "Одиночество"]/[FULL: Парус]',
        );
    });

    test('respects custom separator', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions({ separator: '-' }));

      await expect
        .poll(() => getTextView(page))
        .toEqual(
          '[FULL: Литература]-[FULL: Стихи]-[FULL: Золотой век русской поэзии]-[FULL: Михаил Лермонтов]-[FULL: Тема "Одиночество"]-[FULL: Парус]',
        );
    });

    test('shortens items in narrower container', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions({ storyContainerWidth: '680px' }));

      // shortLabel применяется только после debounce-пересчёта ширины — ретраим до стабилизации.
      await expect
        .poll(() => getTextView(page))
        .toEqual(
          '[FULL: Литература]/[FULL: Стихи]/[SHORTLABEL: Золотой век]/[FULL: Михаил Лермонтов]/[FULL: Тема "Одиночество"]/[FULL: Парус]',
        );
    });
  });

  test.describe('props propagation', () => {
    test('size renders for key values', async ({ gotoStory, getByTestId }) => {
      for (const size of [SIZE.Xs, SIZE.S]) {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(TEST_IDS.root)).toBeVisible();
      }
    });
  });
});
