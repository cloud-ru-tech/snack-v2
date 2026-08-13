import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, waitForImages } from '#playwright-tooling/utils';

import { buildStoryOptions, UPLOAD_FILES_STORIES } from './helpers';

test.describe('UploadFiles — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, UPLOAD_FILES_STORIES.visualMatrix));
    await waitForFonts();
    await waitForImages(page);
    await assertVisualMatrixSnapshot(page);
  });
});
