import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertVisualMatrixSnapshot,
  composeScreenshots,
  ScreenshotCell,
  screenshotWithPadding,
} from '#playwright-tooling/utils';

import { buildStoryOptions, STEPPER_STORIES, TEST_IDS } from './helpers';

test.describe('Stepper — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // modes.png — composite по двум layout-режимам одной Playground-композиции:
  // desktop и mobile. Раскладка переключается тулбар-глобалом `layoutType`
  // (через URL-globals), отдельной mobile-story больше нет.
  test('modes', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.playground));
    await waitForFonts();
    const desktop = await screenshotWithPadding(page, getByTestId(TEST_IDS.example), 16, SCREENSHOT_DEFAULT_OPTS);

    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();
    const mobile = await screenshotWithPadding(page, getByTestId(TEST_IDS.example), 16, SCREENSHOT_DEFAULT_OPTS);

    const composite = await composeScreenshots(
      [
        { label: 'desktop', png: desktop },
        { label: 'mobile', png: mobile },
      ],
      { layout: 'col' },
    );
    expect(composite).toMatchSnapshot('modes.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Матрица интерактива кружка-шага: строка на каждое базовое состояние
  // (completed / current / waiting / rejected) × колонки default / hover / pressed /
  // focus. У каждого состояния свой базовый цвет, поэтому state-layer-тинт и
  // focus-ring выглядят по-разному — снимаем все. Кнопки «Назад/Далее» — это
  // @ds/button, их состояния покрыты в собственном пакете, здесь не дублируем.
  test('interaction states (state × default/hover/pressed/focus)', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.interactionStates));
    await waitForFonts();

    const stateLabels = ['completed', 'current', 'loading', 'waiting', 'rejected'];
    const circles = getByTestId(TEST_IDS.step);
    const shots: Record<string, Buffer>[] = stateLabels.map(() => ({}));

    // Проход 1 — default / hover / pressed через мышь.
    for (let index = 0; index < stateLabels.length; index += 1) {
      const circle = circles.nth(index);

      await page.mouse.move(0, 0);
      shots[index].default = await screenshotWithPadding(page, circle, 8, SCREENSHOT_DEFAULT_OPTS);

      await circle.hover();
      shots[index].hover = await screenshotWithPadding(page, circle, 8, SCREENSHOT_DEFAULT_OPTS);

      const box = await circle.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        shots[index].pressed = await screenshotWithPadding(page, circle, 8, SCREENSHOT_DEFAULT_OPTS);
        await page.mouse.up();
      }
    }

    // Проход 2 — focus через клавиатурный tab-walk: Tab последовательно переводит
    // фокус по кружкам в DOM-порядке (единственные focusable в story). Так
    // `:focus-visible` (клавиатурный) срабатывает на каждом, а не только на последнем.
    await page.mouse.move(0, 0);
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    for (let index = 0; index < stateLabels.length; index += 1) {
      await page.keyboard.press('Tab');
      shots[index].focus = await screenshotWithPadding(page, circles.nth(index), 8, SCREENSHOT_DEFAULT_OPTS);
    }

    const cells: ScreenshotCell[] = [];
    for (let index = 0; index < stateLabels.length; index += 1) {
      for (const interaction of ['default', 'hover', 'pressed', 'focus'] as const) {
        cells.push({ label: `${stateLabels[index]}/${interaction}`, png: shots[index][interaction] });
      }
    }

    const composite = await composeScreenshots(cells, { layout: 'grid', columns: 4 });
    expect(composite).toMatchSnapshot('interaction-states.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
