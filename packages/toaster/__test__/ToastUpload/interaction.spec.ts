import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('ToastUpload — interaction', () => {
  test('close button is focusable and clickable', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ closable: true }));
    const close = getByTestId(TEST_IDS.uploadClose);
    await close.focus();
    await expect(close).toBeFocused();
    await close.click();
    // Playground рендерится статично; root остаётся в DOM, важно что обработчик не упал.
    await expect(getByTestId(TEST_IDS.uploadRoot)).toBeVisible();
  });

  test('collapse button toggles data-collapsed and скрывает file list', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ collapsed: false }));
    const root = getByTestId(TEST_IDS.uploadRoot);
    // Стартовое состояние: data-collapsed отсутствует (uncontrolled = collapsed=false).
    await expect(root).not.toHaveAttribute('data-collapsed', 'true');
    await expect(getByTestId(TEST_IDS.uploadList)).toBeVisible();

    await getByTestId(TEST_IDS.uploadCollapseButton).click();

    // После клика — toast переключается в collapsed: data-collapsed=true,
    // file list исчезает из DOM (см. rendering.spec — collapsed=true → toHaveCount(0)).
    await expect(root).toHaveAttribute('data-collapsed', 'true');
    await expect(getByTestId(TEST_IDS.uploadList)).toHaveCount(0);
  });
});
