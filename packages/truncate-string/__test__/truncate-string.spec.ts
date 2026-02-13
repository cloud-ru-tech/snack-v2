import { expect, test } from '../../../playwright/fixtures';
import { VARIANT } from '../src/constants';

const TRUNCATE_STRING_TEST_ID = 'truncate-string';
const FULL_TEXT = 'Very long text that should be truncated in the middle';
const TRUNCATED_TEXT = 'Very long text t...ed in the middle';

test.describe('Truncate string', () => {
  test('Text should be cropped in the middle for variant = Variant.Middle', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'truncatestring',
      story: 'playground',
      props: {
        'data-test-id': TRUNCATE_STRING_TEST_ID,
        text: FULL_TEXT,
        variant: VARIANT.Middle,
      },
    });

    const truncatedText = getByTestId('truncated-text');
    await expect(truncatedText).toHaveText(TRUNCATED_TEXT);
  });
});
