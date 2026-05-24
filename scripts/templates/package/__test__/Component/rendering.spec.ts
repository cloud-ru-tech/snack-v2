import { expect, test } from '#playwright-tooling/fixtures'

import { {{COMPONENT_CONST}}_STORIES, {{COMPONENT_CONST}}_TEST_ID, buildStoryOptions } from './helpers'

test.describe('{{DISPLAY_TITLE}} — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions())
    await expect(getByTestId({{COMPONENT_CONST}}_TEST_ID)).toBeVisible()
  })

  test('variant propagates to data-variant', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ variant: 'outlined' }))
    await expect(getByTestId({{COMPONENT_CONST}}_TEST_ID)).toHaveAttribute('data-variant', 'outlined')
  })
})
