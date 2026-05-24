import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects'
import { expect, test } from '#playwright-tooling/fixtures'
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils'

import { {{COMPONENT_CONST}}_STORIES, buildStoryOptions } from './helpers'

test.describe('{{DISPLAY_TITLE}} — visual regression', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    )
  })

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, {{COMPONENT_CONST}}_STORIES.visualMatrix))
    await waitForFonts()
    await assertVisualMatrixSnapshot(page)
  })
})
