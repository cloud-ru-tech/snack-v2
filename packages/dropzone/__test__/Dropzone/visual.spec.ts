import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, DROPZONE_STORIES, TEST_IDS } from './helpers';

test.describe('Dropzone — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, DROPZONE_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Drag-over добавлен 4-й cell'ой в тот же composite: активируется реальным dragover'ом,
  // показывает activated-заливку (`material/stateLayer/activated/hovered/filled`) — состояние,
  // невыразимое статикой.
  test('interaction states (default × hover × focus × drag-over)', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    const root = getByTestId(TEST_IDS.dropzone.root);

    await assertInteractionStatesSnapshot(page, {
      target: root,
      extraStates: [
        {
          label: 'drag-over',
          activate: async () => {
            await root.evaluate(el => {
              const dt = new DataTransfer();
              dt.items.add(new File(['x'], 'a.png', { type: 'image/png' }));
              el.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer: dt }));
            });
            await expect(root).toHaveAttribute('data-over', 'true');
          },
          deactivate: async () => {
            await root.evaluate(el =>
              el.dispatchEvent(new DragEvent('dragleave', { bubbles: true, cancelable: true })),
            );
          },
        },
      ],
    });
  });
});
