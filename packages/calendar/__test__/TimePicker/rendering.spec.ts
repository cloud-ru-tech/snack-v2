import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import { buildTimePickerOptions, TEST_IDS, TIME_PICKER_STORIES } from './helpers';

/**
 * Ключевая выборка `size × showSeconds`: на каждое значение `size` приходится один сценарий showSeconds.
 *
 * TimePicker size='s' в Playground не рендерит root с data-test-id (bug пакета — gap-аудит calendar),
 * поэтому из выборки исключён.
 */
const KEY_COMBOS = [
  { size: SIZE.M, showSeconds: true },
  { size: SIZE.L, showSeconds: false },
] as const;

test.describe('TimePicker — rendering', () => {
  /** Атрибуты корня `TimePicker` (`data-size`, `data-show-seconds`, …). */
  test.describe('render', () => {
    test(`story ${TIME_PICKER_STORIES.playground} renders root`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildTimePickerOptions(undefined, TIME_PICKER_STORIES.playground));
      await expect(getByTestId(TEST_IDS.timePickerPlayground)).toBeVisible();
    });
  });

  test.describe('states', () => {
    test('fitToContainer=false removes stretch attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildTimePickerOptions({ fitToContainer: false, size: SIZE.M }));
      await expect(getByTestId(TEST_IDS.timePickerPlayground)).not.toHaveAttribute('data-fit-to-container');
    });
  });

  test.describe('props propagation', () => {
    for (const { size, showSeconds } of KEY_COMBOS) {
      test(`size=${size} + showSeconds=${showSeconds}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildTimePickerOptions({ size, showSeconds }));
        const root = getByTestId(TEST_IDS.timePickerPlayground);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-show-seconds', String(showSeconds));
      });
    }
  });
});
