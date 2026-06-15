import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, itemTestId, LIST_STORIES } from './helpers';

// itemWrapRender оборачивает item в произвольный узел (тут — <a>). Проверяем runtime-атрибуты
// конкретного anchor'а (allowed exception к запрету getByRole/getByText: assertion на атрибуте
// узла, найденного через getByTestId, см. e2e-testing-standard §polymorphism).
test.describe('List — polymorphism (itemWrapRender)', () => {
  test.beforeEach(async ({ gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.polymorphic));
  });

  test('internal item is wrapped in an anchor carrying its href', async ({ page, getByTestId }) => {
    const anchor = page.locator('a', { has: getByTestId(itemTestId('docs')) });
    await expect(anchor).toHaveAttribute('href', 'https://cloud.ru/docs');
  });

  test('external item carries target=_blank and rel=noopener noreferrer', async ({ page, getByTestId }) => {
    const anchor = page.locator('a', { has: getByTestId(itemTestId('external')) });
    await expect(anchor).toHaveAttribute('href', 'https://cloud.ru/');
    await expect(anchor).toHaveAttribute('target', '_blank');
    await expect(anchor).toHaveAttribute('rel', /noopener/);
  });
});
