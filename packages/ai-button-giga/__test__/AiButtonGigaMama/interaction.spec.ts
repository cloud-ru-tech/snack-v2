import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test('Mama пересчитывает доступную ширину подписи и центрирует короткую группу при изменении размера.', async ({
  page,
  gotoStory,
  setStoryArgs,
  getByTestId,
  waitForFonts,
}) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await gotoStory(buildStoryOptions());
  await waitForFonts();
  const button = getByTestId(TEST_IDS.root);
  const label = getByTestId(TEST_IDS.label);
  const content = getByTestId(TEST_IDS.content);

  for (const width of [304, 480]) {
    await setStoryArgs({
      style: { width },
      label: 'Создать виртуальную машину и настроить все необходимые параметры сети и хранения данных',
    });
    const box = await button.boundingBox();
    const textBox = await label.boundingBox();
    expect(box?.width).toBe(width);
    expect(box?.height).toBe(72);
    expect(textBox?.width).toBeCloseTo(width - 64, 1);
    expect(await label.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
    expect(await label.evaluate(element => getComputedStyle(element).textOverflow)).toBe('ellipsis');

    await setStoryArgs({ label: 'Создать' });
    const shortBox = await label.boundingBox();
    const groupBox = await content.boundingBox();
    expect(shortBox?.width).toBeLessThan(width - 64);
    expect((groupBox?.x ?? 0) + (groupBox?.width ?? 0) / 2).toBeCloseTo((box?.x ?? 0) + width / 2, 1);
  }

  await page.setViewportSize({ width: 280, height: 800 });
  await setStoryArgs({ style: { width: 480 }, label: 'Создать виртуальную машину и настроить необходимые параметры' });
  const narrow = await button.boundingBox();
  const text = await label.boundingBox();
  expect(narrow?.width).toBeLessThanOrEqual(280);
  expect((narrow?.x ?? 0) + (narrow?.width ?? 0)).toBeLessThanOrEqual(280);
  expect((text?.x ?? 0) + (text?.width ?? 0)).toBeLessThanOrEqual((narrow?.x ?? 0) + (narrow?.width ?? 0) - 18);
});

test('Подложка совпадает с внутренним контуром рамки при наведении.', async ({
  gotoStory,
  setStoryArgs,
  getByTestId,
}) => {
  await gotoStory(buildStoryOptions());
  const button = getByTestId(TEST_IDS.root);
  for (const appearance of ['primary', 'neutral']) {
    await setStoryArgs({ appearance });
    // CSS-проверка геометрии применима и на устройствах без постоянного hover.
    const geometry = await button.evaluate(element => {
      const root = getComputedStyle(element);
      const layerElement = element.querySelector('[data-state]');
      if (!layerElement) throw new Error('Подложка отсутствует.');
      const layer = getComputedStyle(layerElement);
      const rootBox = element.getBoundingClientRect();
      const layerBox = layerElement.getBoundingClientRect();
      return {
        outerRadius: parseFloat(root.borderTopLeftRadius),
        borderWidth: parseFloat(root.borderTopWidth),
        layerRadius: parseFloat(layer.borderTopLeftRadius),
        layerInset: layerBox.x - rootBox.x,
        width: rootBox.width,
        height: rootBox.height,
      };
    });
    expect(geometry.layerRadius).toBe(geometry.outerRadius - geometry.borderWidth);
    expect(geometry.layerInset).toBe(geometry.borderWidth);
    expect(geometry.width).toBeGreaterThan(0);
    expect(geometry.width).toBeLessThanOrEqual(304);
    expect(geometry.height).toBe(72);
  }
});
