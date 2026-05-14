import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  UPLOAD_CLOSE_TEST_ID,
  UPLOAD_COLLAPSE_BUTTON_TEST_ID,
  UPLOAD_LIST_TEST_ID,
  UPLOAD_TEST_ID,
} from './helpers';

test.describe('ToastUpload — interaction', () => {
  test('close button is focusable and clickable', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ closable: true }));
    const close = getByTestId(UPLOAD_CLOSE_TEST_ID);
    await close.focus();
    await expect(close).toBeFocused();
    await close.click();
    // Playground рендерится статично; root остаётся в DOM, важно что обработчик не упал.
    await expect(getByTestId(UPLOAD_TEST_ID)).toBeVisible();
  });

  test('collapse button toggles data-collapsed and скрывает file list', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ collapsed: false }));
    const root = getByTestId(UPLOAD_TEST_ID);
    // Стартовое состояние: data-collapsed отсутствует (uncontrolled = collapsed=false).
    await expect(root).not.toHaveAttribute('data-collapsed', 'true');
    await expect(getByTestId(UPLOAD_LIST_TEST_ID)).toBeVisible();

    await getByTestId(UPLOAD_COLLAPSE_BUTTON_TEST_ID).click();

    // После клика — toast переключается в collapsed: data-collapsed=true,
    // file list исчезает из DOM (см. rendering.spec — collapsed=true → toHaveCount(0)).
    await expect(root).toHaveAttribute('data-collapsed', 'true');
    await expect(getByTestId(UPLOAD_LIST_TEST_ID)).toHaveCount(0);
  });
});
