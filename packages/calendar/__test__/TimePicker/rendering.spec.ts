import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import { buildTimePickerOptions, TEST_IDS, TIME_PICKER_STORIES } from './helpers';

test.describe('TimePicker — rendering', () => {
  /** Атрибуты корня `TimePicker` (`data-size`, `data-show-seconds`, …). */
  test.describe('render', () => {
    for (const story of Object.values(TIME_PICKER_STORIES)) {
      test(`story ${story} renders root`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildTimePickerOptions(undefined, story));
        await expect(getByTestId(TEST_IDS.timePickerPlayground)).toBeVisible();
      });
    }
  });

  test.describe('states', () => {
    test('showSeconds=false', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildTimePickerOptions({ showSeconds: false, size: SIZE.M }));
      await expect(getByTestId(TEST_IDS.timePickerPlayground)).toHaveAttribute('data-show-seconds', 'false');
    });

    test('fitToContainer=false removes stretch attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildTimePickerOptions({ fitToContainer: false, size: SIZE.M }));
      await expect(getByTestId(TEST_IDS.timePickerPlayground)).not.toHaveAttribute('data-fit-to-container');
    });
  });

  test.describe('props propagation', () => {
    for (const size of Object.values(SIZE)) {
      test(`data-size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildTimePickerOptions({ size }));
        await expect(getByTestId(TEST_IDS.timePickerPlayground)).toHaveAttribute('data-size', size);
      });
    }

    test('showSeconds=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildTimePickerOptions({ showSeconds: true, size: SIZE.M }));
      await expect(getByTestId(TEST_IDS.timePickerPlayground)).toHaveAttribute('data-show-seconds', 'true');
    });
  });
});
