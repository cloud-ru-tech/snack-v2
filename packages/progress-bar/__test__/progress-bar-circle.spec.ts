import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'progress-bar-circle-test';

test.describe('ProgressBarCircle', () => {
  let story: (props: Record<string, string>) => Promise<void>;

  test.beforeEach(({ gotoStory }) => {
    story = props =>
      gotoStory({
        name: 'progressbarcircle',
        group: 'progressbar',
        story: 'playground',
        props: {
          'data-test-id': TEST_ID,
          ...props,
        },
      });
  });

  test('Rendered', async ({ getByTestId }) => {
    await story({ progress: '50' });
    const progressBarCircle = getByTestId(TEST_ID);

    await expect(progressBarCircle).toBeVisible();

    const progress = await progressBarCircle.evaluate(el =>
      getComputedStyle(el).getPropertyValue('--snack-progress-bar-circle-value'),
    );

    await expect(progress).toBe('50%');
  });

  test('Rendered as 0 progress for negative numbers', async ({ getByTestId }) => {
    await story({ progress: '-5' });
    const progressBarCircle = getByTestId(TEST_ID);
    const progress = await progressBarCircle.evaluate(el =>
      getComputedStyle(el).getPropertyValue('--snack-progress-bar-circle-value'),
    );

    await expect(progress).toBe('0%');
  });

  test('Rendered as totally filled progress bar for numbers > 100', async ({ getByTestId }) => {
    await story({ progress: '150' });
    const progressBarCircle = getByTestId(TEST_ID);
    const progress = await progressBarCircle.evaluate(el =>
      getComputedStyle(el).getPropertyValue('--snack-progress-bar-circle-value'),
    );

    await expect(progress).toBe('100%');
  });
});
