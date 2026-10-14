import { expect, test } from '#playwright-tooling/fixtures';

import { APPEARANCE, SIZE } from '../../src/constants';
import { assertSemiboldFont } from '../shared/typography';
import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiButtonGigaFunction: props propagation', () => {
  for (const appearance of Object.values(APPEARANCE)) {
    test(`appearance=${appearance}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ appearance }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-appearance', appearance);
    });
  }
  for (const size of Object.values(SIZE)) {
    test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ size }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-size', size);
    });
  }
});

test.describe('AiButtonGigaFunction: отображение', () => {
  for (const appearance of Object.values(APPEARANCE)) {
    test(`Загрузка сохраняется при disabled=true и возвращает недоступность после завершения: ${appearance}.`, async ({
      gotoStory,
      setStoryArgs,
      getByTestId,
      waitForFonts,
    }) => {
      await gotoStory(buildStoryOptions({ appearance, disabled: true, loading: false }));
      await waitForFonts();
      const root = getByTestId(TEST_IDS.root);
      const disabledBox = await root.boundingBox();
      await expect(root).toBeDisabled();
      await expect(getByTestId(TEST_IDS.logo)).toBeVisible();
      await expect(getByTestId(TEST_IDS.loader)).toHaveCount(0);

      await setStoryArgs({ loading: true });
      await expect(root).not.toHaveAttribute('disabled');
      await expect(root).toHaveAttribute('aria-busy', 'true');
      await expect(root).toHaveAttribute('aria-disabled', 'true');
      await expect(root).not.toHaveAttribute('data-disabled');
      await expect(getByTestId(TEST_IDS.loader)).toBeVisible();
      await expect(getByTestId(TEST_IDS.logo)).toHaveCount(0);
      await root.focus();
      await expect(root).toBeFocused();
      expect((await root.boundingBox())?.width).toBeCloseTo(disabledBox?.width ?? 0, 1);

      await setStoryArgs({ loading: false });
      await expect(root).toBeDisabled();
      await expect(root).not.toHaveAttribute('aria-busy');
      await expect(getByTestId(TEST_IDS.logo)).toBeVisible();
      await expect(getByTestId(TEST_IDS.loader)).toHaveCount(0);
    });
  }

  test('XS использует файл Semibold, совпадающий с начертанием Figma.', async ({
    browserName,
    page,
    gotoStory,
    waitForFonts,
  }) => {
    test.skip(browserName !== 'chromium', 'Фактический файл шрифта доступен через Chromium CDP.');
    await gotoStory(buildStoryOptions({ size: SIZE.Xs }));
    await waitForFonts();
    await assertSemiboldFont(page, TEST_IDS.label);
  });

  test('Подпись задаёт доступное имя обычной кнопки.', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ label: 'Создать ресурс' }));
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('type', 'button');
    await expect(root).toHaveAccessibleName('Создать ресурс');
  });
  test('Neutral сохраняет цветной глобус и меняет оформление.', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ appearance: 'neutral' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-appearance', 'neutral');
    await expect(getByTestId(TEST_IDS.logo)).toHaveAttribute('data-variant', 'logoLight');
  });
  test('Загрузка сохраняет ширину и заменяет глобус.', async ({
    gotoStory,
    setStoryArgs,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    const normal = await getByTestId(TEST_IDS.root).boundingBox();
    await setStoryArgs({ loading: true });
    const loading = await getByTestId(TEST_IDS.root).boundingBox();
    expect(loading?.width).toBeCloseTo(normal?.width ?? 0, 1);
    await expect(getByTestId(TEST_IDS.loader)).toBeVisible();
    await expect(getByTestId(TEST_IDS.logo)).toHaveCount(0);
  });
});
