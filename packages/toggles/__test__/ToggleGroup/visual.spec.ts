import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, Page, test } from '#playwright-tooling/fixtures';
import { composeScreenshots } from '#playwright-tooling/utils';

import { buildToggleGroupStory } from '../_shared/helpers';

const ITEM_IDS = ['item-1', 'item-2', 'item-3', 'item-4'] as const;
const PADDING = 8;

// ToggleGroup сам по себе не рендерит DOM-обёртку (только Context), поэтому снимаем
// прямоугольник, охватывающий все item-карточки + небольшой padding.
async function shotItemsBox(page: Page) {
  const boxes = await Promise.all(
    ITEM_IDS.map(async id => {
      const box = await page.getByTestId(id).boundingBox();
      if (!box) throw new Error(`ToggleGroup item missing: ${id}`);
      return box;
    }),
  );
  const minX = Math.min(...boxes.map(b => b.x));
  const minY = Math.min(...boxes.map(b => b.y));
  const maxX = Math.max(...boxes.map(b => b.x + b.width));
  const maxY = Math.max(...boxes.map(b => b.y + b.height));
  return page.screenshot({
    ...SCREENSHOT_DEFAULT_OPTS,
    clip: {
      x: Math.max(0, Math.floor(minX - PADDING)),
      y: Math.max(0, Math.floor(minY - PADDING)),
      width: Math.ceil(maxX - minX + PADDING * 2),
      height: Math.ceil(maxY - minY + PADDING * 2),
    },
  });
}

test.describe('ToggleGroup — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('selection states (default × single × multiple)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildToggleGroupStory());
    await waitForFonts();
    const defaultPng = await shotItemsBox(page);

    await gotoStory(buildToggleGroupStory({ selectionMode: 'single' }));
    await waitForFonts();
    await getByTestId('item-2').click();
    const singlePng = await shotItemsBox(page);

    await gotoStory(buildToggleGroupStory({ selectionMode: 'multiple' }));
    await waitForFonts();
    await getByTestId('item-1').click();
    await getByTestId('item-3').click();
    const multiplePng = await shotItemsBox(page);

    const composite = await composeScreenshots(
      [
        { label: 'default', png: defaultPng },
        { label: 'single (item-2 selected)', png: singlePng },
        { label: 'multiple (item-1 + item-3 selected)', png: multiplePng },
      ],
      { layout: 'col' },
    );

    expect(composite).toMatchSnapshot('selection-states.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
