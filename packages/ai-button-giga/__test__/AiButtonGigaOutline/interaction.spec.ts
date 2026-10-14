import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test('Сменная иконка занимает слот размера кнопки, а загрузка заменяет её индикатором.', async ({
  gotoStory,
  setStoryArgs,
  getByTestId,
  waitForFonts,
}) => {
  await gotoStory(buildStoryOptions());
  await waitForFonts();
  const root = getByTestId(TEST_IDS.root);
  for (const size of ['xs', 's', 'm', 'l']) {
    for (const iconPosition of ['before', 'after']) {
      await setStoryArgs({ size, iconPosition, icon: 'plus', label: 'Создать ресурс', loading: false });
      const custom = getByTestId(TEST_IDS.customIcon);
      await expect(custom).toBeVisible();
      await expect(getByTestId(TEST_IDS.logo)).toHaveCount(0);
      const icon = await custom.boundingBox();
      expect(icon?.width).toBe(size === 'xs' ? 16 : 24);
      expect(icon?.height).toBe(size === 'xs' ? 16 : 24);
      const normal = await root.boundingBox();
      await setStoryArgs({ loading: true });
      await expect(custom).toHaveCount(0);
      await expect(getByTestId(TEST_IDS.loader)).toBeVisible();
      const loading = await root.boundingBox();
      expect(loading?.width).toBeCloseTo(normal?.width ?? 0, 1);
    }
  }
});

test('Длинная подпись увеличивает ширину без переноса и обрезки.', async ({
  gotoStory,
  setStoryArgs,
  getByTestId,
  waitForFonts,
}) => {
  await gotoStory(buildStoryOptions());
  await waitForFonts();
  const root = getByTestId(TEST_IDS.root);
  const label = getByTestId(TEST_IDS.label);
  for (const size of ['xs', 's', 'm', 'l']) {
    for (const icon of ['default', 'none']) {
      await setStoryArgs({ size, icon, label: 'Создать' });
      const short = await root.boundingBox();
      await setStoryArgs({
        label: 'Создать виртуальную машину и настроить параметры сети и хранения данных. '.repeat(4),
      });
      const long = await root.boundingBox();
      const text = await label.boundingBox();
      expect(long?.width).toBeGreaterThan(short?.width ?? 0);
      expect(long?.height).toBe(short?.height);
      expect(text?.x).toBeGreaterThanOrEqual(long?.x ?? 0);
      expect((text?.x ?? 0) + (text?.width ?? 0)).toBeLessThanOrEqual((long?.x ?? 0) + (long?.width ?? 0));
      expect(await label.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      expect(await label.evaluate(element => getComputedStyle(element).whiteSpace)).toBe('nowrap');
    }
  }
});
