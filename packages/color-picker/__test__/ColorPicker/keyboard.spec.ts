import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('ColorPicker — keyboard', () => {
  test('hue slider responds to ArrowRight / ArrowLeft', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ autoApply: true, availableModes: ['hsv'], value: '#ff0000' }));
    const slider = getByTestId(TEST_IDS.sliderH);
    await slider.focus();
    const initial = Number(await slider.getAttribute('aria-valuenow'));
    await slider.press('ArrowRight');
    await expect.poll(async () => Number(await slider.getAttribute('aria-valuenow'))).toBe(initial + 1);
    await slider.press('ArrowLeft');
    await expect.poll(async () => Number(await slider.getAttribute('aria-valuenow'))).toBe(initial);
  });

  test('hue slider Home jumps to min, End jumps to max (359)', async ({ gotoStory, getByTestId }) => {
    // Стартуем с зелёного (h≈120), чтобы Home и End реально двигали thumb.
    await gotoStory(buildStoryOptions({ autoApply: true, availableModes: ['hsv'], value: '#00ff00' }));
    const slider = getByTestId(TEST_IDS.sliderH);
    await slider.focus();

    await slider.press('Home');
    await expect(slider).toHaveAttribute('aria-valuenow', '0');

    await slider.press('End');
    await expect(slider).toHaveAttribute('aria-valuenow', '359');
  });

  test('hue slider PageUp/PageDown move by 10', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ autoApply: true, availableModes: ['hsv'], value: '#ff0000' }));
    const slider = getByTestId(TEST_IDS.sliderH);
    await slider.focus();
    await slider.press('PageUp');
    await expect(slider).toHaveAttribute('aria-valuenow', '10');
    await slider.press('PageDown');
    await expect(slider).toHaveAttribute('aria-valuenow', '0');
  });

  test('hue slider does not wrap past max (regression: 360 → 0)', async ({ gotoStory, getByTestId }) => {
    // Регрессия: раньше `max=360`, и ArrowRight на правом краю давал h=360,
    // colorToRawValue нормализовал в h=0, thumb прыгал в начало. После `max=359`
    // слайдер должен упираться в правый край.
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
