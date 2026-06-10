import { expect, test } from '#playwright-tooling/fixtures';

import { AI_REASONING_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiReasoning — rendering', () => {
  test('renders root with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.description)).toHaveText('Tool is reasoning about the next action');
  });

  test('stepper line on renders divider and connector', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ stepperLine: true }));
    await expect(getByTestId(TEST_IDS.divider)).toBeAttached();
    await expect(getByTestId(TEST_IDS.connector)).toBeAttached();
  });

  test('stepper line off hides divider and connector', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ stepperLine: false }));
    await expect(getByTestId(TEST_IDS.divider)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.connector)).toHaveCount(0);
  });

  test('connector=true can be forced when stepperLine=false', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ stepperLine: false, connector: true }));
    await expect(getByTestId(TEST_IDS.divider)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.connector)).toBeAttached();
  });

  test('connector=false hides connector but keeps divider when stepperLine=true without children', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({ stepperLine: true, connector: false }));
    await expect(getByTestId(TEST_IDS.divider)).toBeAttached();
    await expect(getByTestId(TEST_IDS.connector)).toHaveCount(0);
  });

  test('when children are absent, stepperLine=true + connector=false keeps divider and hides connector', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, AI_REASONING_STORIES.visualMatrix));

    const row = getByTestId(`${TEST_IDS.root}-connector-override-forced-off`);
    await expect(row).toBeVisible();
    await expect(row.getByTestId(TEST_IDS.divider)).toBeAttached();
    await expect(row.getByTestId(TEST_IDS.connector)).toHaveCount(0);
  });
});
