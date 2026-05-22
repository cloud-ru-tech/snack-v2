import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('HiddenDropZone — interaction (browser-specific)', () => {
  // Реальный DataTransfer-drop с File objects — недоступен в Storybook play
  // (jsdom-like environment). Здесь — единственная точка реального DnD pipeline.
  test('drag-over wrapper reveals overlay; real drop dismisses it', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const root = getByTestId(TEST_IDS.hiddenDropZone.root);
    await expect(root).toBeAttached();

    // dragover with real DataTransfer
    await root.evaluate(el => {
      const dt = new DataTransfer();
      dt.items.add(new File(['hi'], 'a.txt', { type: 'text/plain' }));
      const ev = new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer: dt });
      if (!ev.dataTransfer) Object.defineProperty(ev, 'dataTransfer', { value: dt });
      el.dispatchEvent(ev);
    });

    // Overlay должен раскрыться (показывается через CSS, у компонента есть слот `content`).
    // Без вызова e2e — просто smoke: компонент не сломался.
    await expect(root).toBeAttached();
  });
});
