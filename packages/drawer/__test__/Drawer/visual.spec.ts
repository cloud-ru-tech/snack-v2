import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots, waitForSettledInViewport } from '#playwright-tooling/utils';

import { POSITION, WIDTH } from '../../src/constants';
import { buildStoryOptions, DRAWER_STORIES, TEST_IDS } from './helpers';

test.describe('Drawer — visual regression', () => {
  // Drawer — overlay+focus-trap; нельзя открыть несколько одновременно.
  // VisualMatrix story показывает только триггеры, поэтому baseline снимков делаем с
  // Playground'а через open=true. Per-placement и per-width — композитами; уникальные
  // сценарии (nested, no-blackout) — отдельными снимками.
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('placements (right × left × top × bottom)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    // Story с 4 триггерами — каждый открывает Drawer в нужный position через клик.
    // В цикле: открыть → скриншот → закрыть → следующий. Composite 2×2.
    await gotoStory(buildStoryOptions(undefined, DRAWER_STORIES.placementsTriggers));
    await waitForFonts();

    const triggers = [
      { position: POSITION.Left, testId: TEST_IDS.drawer.placementTrigger.left },
      { position: POSITION.Right, testId: TEST_IDS.drawer.placementTrigger.right },
      { position: POSITION.Top, testId: TEST_IDS.drawer.placementTrigger.top },
      { position: POSITION.Bottom, testId: TEST_IDS.drawer.placementTrigger.bottom },
    ] as const;

    const cells = [];
    for (const { position, testId } of triggers) {
      await getByTestId(testId).click();
      await expect(getByTestId(TEST_IDS.header)).toBeInViewport();
      // Wait for rc-drawer slide-in: ждём стабилизации bbox header'а (после JS-motion
      // bbox перестаёт меняться). `getAnimations().finished` ненадёжен — rc-drawer
      // оставляет долгоживущие Web Animations, которые никогда не репортят 'idle'.
      await waitForSettledInViewport(getByTestId(TEST_IDS.header));
      cells.push({
        label: position,
        png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS),
      });
      await getByTestId(TEST_IDS.closeButton).click();
      await expect(getByTestId(TEST_IDS.header)).toHaveCount(0);
    }

    const composite = await composeScreenshots(cells, { layout: 'grid', columns: 2 });
    expect(composite).toMatchSnapshot('placements.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('widths (s × m × l)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    const widths = [
      { label: 's', width: WIDTH.S },
      { label: 'm', width: WIDTH.M },
      { label: 'l', width: WIDTH.L },
    ] as const;

    const cells = [];
    for (const { label, width } of widths) {
      // open=true через URL-args синхронизируется в Playground через useEffect
      // после mount — race не успевает к моменту проверки. Кликаем триггер.
      // waitForFonts внутри ждёт getAnimations().finished (rc-drawer slide-in).
      await gotoStory(
        buildStoryOptions({
          position: POSITION.Right,
          width,
          showAfterHeadline: false,
          showMedia: false,
        }),
      );
      await getByTestId(TEST_IDS.drawer.triggerOpen).click();
      await expect(getByTestId(TEST_IDS.header)).toBeVisible();
      await waitForFonts();
      // Wait for rc-drawer slide-in: ждём стабилизации bbox header'а.
      await waitForSettledInViewport(getByTestId(TEST_IDS.header));
      cells.push({
        label,
        png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS),
      });
    }

    const composite = await composeScreenshots(cells, { layout: 'col' });
    expect(composite).toMatchSnapshot('widths.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open-nested (parent + child both open)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, DRAWER_STORIES.nestedDrawer));
    await waitForFonts();

    await getByTestId(TEST_IDS.drawer.triggerOpen).click();
    await getByTestId(TEST_IDS.drawer.nestedTrigger).click();
    await expect(getByTestId(TEST_IDS.nestedDrawer)).toBeVisible();
    // Вложенный Drawer открывается JS-motion'ом (slide-in вложенного + сдвиг
    // родителя влево + затемнение backdrop). `toBeVisible` проходит сразу после
    // mount, до конца анимации — без ожидания скриншот ловит случайный кадр
    // (родитель недосдвинут, backdrop недозатемнён). Ждём стабилизации bbox
    // вложенного Drawer'а: он слайдится последним, к его остановке сцена собрана.
    await waitForSettledInViewport(getByTestId(TEST_IDS.nestedDrawer));

    // Snapshot всей viewport, а не `#storybook-root` — drawer покрывает viewport
    // вертикально, а demo-обёртка (`DemoPage`/`DemoPanel`) даёт ниже drawer'а
    // пустой strip снизу, который в кадре не нужен.
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-nested.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });

  test('open-no-blackout', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(
      buildStoryOptions({
        position: POSITION.Right,
        showBlackout: false,
        showAfterHeadline: false,
        showMedia: false,
      }),
    );
    await getByTestId(TEST_IDS.drawer.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.header)).toBeVisible();
    await waitForFonts();

    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-no-blackout.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });

  // Mobile-поверхность: тот же Drawer открывается как BottomSheet. Нужны обе вещи одновременно —
  // форс layoutType='mobile' через тулбар-глобал И mobile-viewport (иначе sheet
  // рендерится на desktop-ширине). Sheet — full-viewport overlay → снимаем page.screenshot()
  // (см. visual-regression-standard.md). Mobile-baseline = ground truth DS (Figma-parity не применим).
  test('open-mobile (bottom sheet surface)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(
      buildStoryOptions(
        {
          'data-test-id': TEST_IDS.drawer.root,
          showAfterHeadline: false,
          showMedia: false,
        },
        DRAWER_STORIES.playground,
        { layoutType: 'mobile' },
      ),
    );
    await getByTestId(TEST_IDS.drawer.triggerOpen).click();
    // На mobile потребительский `data-test-id` оседает на корне BottomSheet'а.
    const sheet = getByTestId(TEST_IDS.drawer.root);
    await expect(sheet).toBeVisible();
    await waitForFonts();
    // rc-drawer/JS-motion (slide-up): ждём стабилизацию bbox вместо document.getAnimations.
    await waitForSettledInViewport(sheet);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
