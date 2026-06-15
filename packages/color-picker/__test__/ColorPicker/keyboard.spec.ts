import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('ColorPicker — keyboard', () => {
  test('hue slider PageUp / PageDown move by 10', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ autoApply: true, availableModes: ['hsv'], value: '#ff0000' }));
    const slider = getByTestId(TEST_IDS.sliderH);
    await slider.focus();
    await slider.press('PageUp');
    await expect(slider).toHaveAttribute('aria-valuenow', '10');
    await slider.press('PageDown');
    await expect(slider).toHaveAttribute('aria-valuenow', '0');
  });

  test('hue slider does not wrap past max (regression: 360 → 0)', async ({ gotoStory, getByTestId }) => {
    // max=359, а не 360: иначе h=360 нормализуется в 0 и thumb прыгает в начало.
    await gotoStory(buildStoryOptions({ autoApply: true, availableModes: ['hsv'], value: '#00ff00' }));
    const slider = getByTestId(TEST_IDS.sliderH);
    await slider.focus();
    await slider.press('End');
    await expect(slider).toHaveAttribute('aria-valuenow', '359');
    await slider.press('ArrowRight');
    await expect(slider).toHaveAttribute('aria-valuenow', '359');
    await slider.press('PageUp');
    await expect(slider).toHaveAttribute('aria-valuenow', '359');
  });
});
