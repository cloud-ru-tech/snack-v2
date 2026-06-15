import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  COLOR_PICKER_FIELD_ALPHA_TEST_ID,
  COLOR_PICKER_ROOT_TEST_ID,
  COLOR_PICKER_SEGMENTS_TEST_ID,
  FIELD_COLOR_STORIES,
  TEST_IDS,
} from './helpers';

// Корень readonly-инстанса в InteractionTest-сцене (см. FieldColor.InteractionTest.stories.tsx).
const READONLY_ROOT_TEST_ID = 'field-color-readonly';
// defaultValue readonly-поля в той же сцене — именно его пишет copyTextToClipboard в буфер.
const READONLY_VALUE = '#00ff00';

test.describe('FieldColor — interaction', () => {
  test('clicking the trigger mounts the color picker (portal mount)', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.fieldColor);
    await expect(root).toBeVisible();
    await expect(page.getByTestId(COLOR_PICKER_ROOT_TEST_ID)).toHaveCount(0);

    await root.click();
    await expect(page.getByTestId(COLOR_PICKER_ROOT_TEST_ID)).toBeVisible();
    await expect(page.getByTestId(COLOR_PICKER_SEGMENTS_TEST_ID)).toBeVisible();
  });

  test('opening the picker focuses the input and marks the root as open', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.fieldColor);
    const input = getByTestId(TEST_IDS.fieldColorInput);
    await root.click();
    await expect(page.getByTestId(COLOR_PICKER_ROOT_TEST_ID)).toBeVisible();
    // FieldColor.useEffect(open) фокусирует свой input (не hex-поле палитры); PopoverPrivate
    // немодальный и фокус в портал не уводит — паритет с легаси @snack-uikit/fields.
    await expect(input).toBeFocused();
    // Открытый picker подсвечивает корень через data-focusvisible (showOpen || focusVisible).
    await expect(root).toHaveAttribute('data-focusvisible', 'true');
  });

  test('Escape closes the picker (color-picker root unmounts)', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.fieldColor);
    await root.click();
    await expect(page.getByTestId(COLOR_PICKER_ROOT_TEST_ID)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByTestId(COLOR_PICKER_ROOT_TEST_ID)).toHaveCount(0);
  });

  test('clicking outside closes the picker (color-picker root unmounts)', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.fieldColor);
    await root.click();
    await expect(page.getByTestId(COLOR_PICKER_ROOT_TEST_ID)).toBeVisible();

    // Клик в угол вьюпорта, заведомо вне триггера и портальной палитры.
    await page.mouse.click(2, 2);
    await expect(page.getByTestId(COLOR_PICKER_ROOT_TEST_ID)).toHaveCount(0);
  });

  test('withAlpha=false hides the alpha field inside the picker (branch proof)', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    // Дешёвая проверка ветки availableModes/withAlpha без второго baseline:
    // открытая палитра без alpha-поля.
    await gotoStory(buildStoryOptions({ withAlpha: false }));
    await getByTestId(TEST_IDS.fieldColor).click();
    await expect(page.getByTestId(COLOR_PICKER_ROOT_TEST_ID)).toBeVisible();
    await expect(page.getByTestId(COLOR_PICKER_FIELD_ALPHA_TEST_ID)).toHaveCount(0);
  });
});

// Browser-specific: реальная запись в буфер через copyTextToClipboard (copy-to-clipboard →
// execCommand/clipboard API). В synthetic storybook-test буфер недоступен, поэтому read-back
// живёт здесь. Паттерн повторяет FieldSecure/interaction.spec.ts.
test.describe('FieldColor — interaction (browser clipboard)', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Clipboard permissions are only supported in Chromium');

  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('readonly copy button writes the field value to the real clipboard', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_COLOR_STORIES.interactionTest));
    const readonly = getByTestId(READONLY_ROOT_TEST_ID);
    await readonly.getByTestId(TEST_IDS.fieldTextCopyButton).click();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(READONLY_VALUE);
  });
});
