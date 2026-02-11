import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'progress-bar-test';
const FILLER_TEST_ID = 'progress-bar-filler';

test.describe('ProgressBar', () => {
  let story: (props: Record<string, string>) => Promise<void>;

  test.beforeEach(({ gotoStory }) => {
    story = props =>
      gotoStory({
        name: 'progressbar',
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
    const progressBar = getByTestId(TEST_ID);

    await expect(progressBar).toBeVisible();

    const filler = getByTestId(FILLER_TEST_ID);
    const progress = await filler.evaluate(el => getComputedStyle(el).getPropertyValue('--snack-progress-bar-value'));

    await expect(progress).toBe('50%');
  });

  test('Rendered as 0 progress for negative numbers', async ({ getByTestId }) => {
    await story({ progress: '-5' });
    const filler = getByTestId(FILLER_TEST_ID);
    const progress = await filler.evaluate(el => getComputedStyle(el).getPropertyValue('--snack-progress-bar-value'));

    await expect(progress).toBe('0%');
  });

  test('Rendered as totally filled progress bar for numbers > 100', async ({ getByTestId }) => {
    await story({ progress: '150' });
    const filler = getByTestId(FILLER_TEST_ID);
    const progress = await filler.evaluate(el => getComputedStyle(el).getPropertyValue('--snack-progress-bar-value'));

    await expect(progress).toBe('100%');
  });
});
