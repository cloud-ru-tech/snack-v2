import { expect, test } from '#playwright-tooling/fixtures';

import { VARIANT, VARIANT_ACTION_LABELS, VARIANT_MESSAGES } from '../../src/constants';
import { AI_FIELD_NOTICE_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiFieldNotice — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('renders banner description for support variant', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        variant: VARIANT.Support,
      }),
    );
    await expect(getByTestId(TEST_IDS.bannerContent)).toContainText(VARIANT_MESSAGES.support);
  });

  test('renders action label', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        variant: VARIANT.Password,
      }),
    );
    await expect(getByTestId(TEST_IDS.bannerAction)).toHaveText(VARIANT_ACTION_LABELS[VARIANT.Password]);
  });

  test('size propagates to data-size', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        size: 'm',
      }),
    );
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-size', 'm');
  });

  test('variant propagates to data-variant', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        variant: VARIANT.Ssh,
      }),
    );
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-variant', VARIANT.Ssh);
  });

  test('renders queue for queue variant', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        variant: VARIANT.Queue,
        queue: {
          open: true,
        },
      }),
    );
    await expect(getByTestId(TEST_IDS.queue)).toBeVisible();
  });

  test('does not render queue for password variant', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        variant: VARIANT.Password,
      }),
    );
    await expect(getByTestId(TEST_IDS.queue)).toHaveCount(0);
  });

  test('renders banner icon for password variant', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_NOTICE_STORIES.interactionTest));
    await expect(getByTestId(TEST_IDS.bannerIcon)).toBeVisible();
  });

  test('omits banner icon for vm agent variant', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_NOTICE_STORIES.bannerOnly));
    await expect(getByTestId(TEST_IDS.bannerIcon)).toHaveCount(0);
  });

  test('renders vm info for vm agent variant', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        variant: VARIANT.VmAgent,
        vmName: 'my-lovely-vm',
        vmIp: '93.7.94.11',
      }),
    );
    await expect(getByTestId(TEST_IDS.bannerContent)).toContainText(VARIANT_MESSAGES.vmAgentTitle);
  });
});
