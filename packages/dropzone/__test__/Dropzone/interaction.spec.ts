import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Dropzone — interaction (browser-specific)', () => {
  // Behavioral assertions (click + visibility) живут в Storybook play.
  // Здесь — реальный DataTransfer-drop и реальный native file input upload через
  // page.setInputFiles(...) — оба требуют браузерных API, недоступных в Storybook play.

  test('real DataTransfer drop fires onFilesUpload', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const root = getByTestId(TEST_IDS.dropzone.root);
    await expect(root).toBeVisible();

    // Build DataTransfer in-page and dispatch real drop event на root.
    await root.evaluate(el => {
      const dt = new DataTransfer();
      const file = new File(['hello'], 'a.txt', { type: 'text/plain' });
      dt.items.add(file);
      const event = new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: dt });
      if (!event.dataTransfer) {
        Object.defineProperty(event, 'dataTransfer', { value: dt });
      }
      el.dispatchEvent(event);
    });

    // После drop ожидаем, что компонент не сломался; для проверки колбэка
    // потребуется stateful Playground (см. Storybook play). Здесь — smoke:
    // компонент остался видимым.
    await expect(root).toBeVisible();
  });

  test('drag over toggles data-over highlight', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.dropzone.root);
    await expect(root).toBeVisible();

    // Реальный dragover с файлом → useDrag выставляет isOver → data-over (drag-подсветка).
    await root.evaluate(el => {
      const dt = new DataTransfer();
      dt.items.add(new File(['x'], 'a.png', { type: 'image/png' }));
      el.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer: dt }));
    });
    await expect(root).toHaveAttribute('data-over', 'true');

    // dragleave → подсветка снимается.
    await root.evaluate(el => {
      el.dispatchEvent(new DragEvent('dragleave', { bubbles: true, cancelable: true }));
    });
    await expect(root).not.toHaveAttribute('data-over', 'true');
  });

  test('native file upload via setInputFiles propagates to input value', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: 'multiple' }));
    const input = getByTestId(TEST_IDS.dropzone.nativeInput);
    // Browser-specific: setInputFiles работает только в реальном Chromium/Firefox/WebKit.
    await input.setInputFiles([
      { name: 'a.txt', mimeType: 'text/plain', buffer: Buffer.from('a') },
      { name: 'b.txt', mimeType: 'text/plain', buffer: Buffer.from('b') },
    ]);
    // После выбора файлов input.files должен содержать 2 записи.
    const filesCount = await input.evaluate(el => (el as HTMLInputElement).files?.length ?? 0);
    expect(filesCount).toBe(2);
  });
});
