import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

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
    await setStoryArgs({ size, label: 'Создать' });
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
});
