import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS, TOOLTIP_STORIES } from './helpers';

test.describe('Tooltip — interaction', () => {
  test('hover trigger opens tooltip', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, TOOLTIP_STORIES.playground));
    await getByTestId(TEST_IDS.tooltip.triggerOpen).hover();
    await expect(getByTestId(TEST_IDS.tooltip.content)).toBeVisible();
  });

  test('moving mouse away hides tooltip', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions(undefined, TOOLTIP_STORIES.playground));
    const trigger = getByTestId(TEST_IDS.tooltip.triggerOpen);
    await trigger.hover();
    await expect(getByTestId(TEST_IDS.tooltip.content)).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(getByTestId(TEST_IDS.tooltip.content)).toBeHidden();
  });

  test('crossing the gap to the tooltip body does not trigger the neighbour tooltip', async ({
    gotoStory,
    getByTestId,
    page,
  }) => {
    await gotoStory(buildStoryOptions(undefined, TOOLTIP_STORIES.stackedHover));

    const lowerTrigger = getByTestId(TEST_IDS.tooltip.triggerOpen);
    await lowerTrigger.hover();

    const content = getByTestId(TEST_IDS.tooltip.content);
    await expect(content).toBeVisible();

    const triggerBox = await lowerTrigger.boundingBox();
    const contentBox = await content.boundingBox();

    expect(triggerBox).not.toBeNull();
    expect(contentBox).not.toBeNull();

    if (!triggerBox || !contentBox) return;

    const x = triggerBox.x + triggerBox.width / 2;
    const upperContent = getByTestId(TEST_IDS.tooltip.upperContent);

    for (let y = triggerBox.y; y >= contentBox.y + contentBox.height / 2; y -= 2) {
      await page.mouse.move(x, y);
      expect(await upperContent.count(), `тултип верхнего элемента открылся на y=${y}`).toBe(0);
    }

    await expect(content).toBeVisible();
  });
});
