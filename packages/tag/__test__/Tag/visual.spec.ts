import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, TAG_STORIES } from './helpers';

test.describe('Tag — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // Tag is non-interactive by default (no hover/focus state without onClick / as).
  // VisualMatrix covers all axes × appearances × sizes; no need for per-state snapshots.
  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, TAG_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });
});
