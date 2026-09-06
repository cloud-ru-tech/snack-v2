import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Только browser-specific сценарии из закрытого списка e2e-testing-standard.md (п.5,
// клик по оверлею вне портала): реакция на клик, hit-testing поверх выреза и всплытие
// нативного события до документа. Клики по кнопкам подсказки живут в play-функции
// InteractionTest, focus-trap — в keyboard.spec.

test.describe('WelcomeTour — interaction', () => {
  test('overlay click does not close the tour', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.triggerOpen).click();

    const hint = getByTestId(TEST_IDS.hint);
    await expect(hint).toBeVisible();

    // Угол вьюпорта — заведомо оверлей: подсказка и вырез вокруг целевого
    // элемента находятся в центре страницы.
    await page.mouse.click(5, 5);

    await expect(hint).toBeVisible();
  });

  test('overlay press does not reach the page', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.hint)).toBeVisible();

    // Слои страницы закрываются по нажатию мимо себя — обработчиком на документе.
    // Факт отмечаем атрибутом: настоящий поток событий указателя даёт только браузер.
    await page.evaluate(() => {
      document.body.dataset.pressReachedPage = 'no';
      document.addEventListener('pointerdown', () => {
        document.body.dataset.pressReachedPage = 'yes';
      });
    });

    // Угол вьюпорта — заведомо оверлей: подсказка и вырез находятся в центре страницы.
    await page.mouse.click(5, 5);

    await expect(page.locator('body')).toHaveAttribute('data-press-reached-page', 'no');
  });

  test('overlay blocks the page while the spotlight keeps the target reachable', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.hint)).toBeVisible();

    // Hit-testing поверх оверлея и выреза — это реальная работа браузера,
    // в play-среде она не воспроизводится.
    const topmostTestId = async (locator: ReturnType<typeof getByTestId>) => {
      const box = await locator.boundingBox();
      if (!box) throw new Error('topmostTestId: locator is not visible');

      return page.evaluate(
        ({ x, y }) =>
          (document.elementFromPoint(x, y) as HTMLElement | null)
            ?.closest('[data-test-id]')
            ?.getAttribute('data-test-id') ?? null,
        { x: box.x + box.width / 2, y: box.y + box.height / 2 },
      );
    };

    // Целевой элемент шага лежит в вырезе — оверлей его не перекрывает.
    expect(await topmostTestId(getByTestId(TEST_IDS.target(0)))).toBe(TEST_IDS.target(0));
    // Остальная страница закрыта оверлеем: триггер под ним недоступен для клика.
    expect(await topmostTestId(getByTestId(TEST_IDS.triggerOpen))).not.toBe(TEST_IDS.triggerOpen);
  });
});
