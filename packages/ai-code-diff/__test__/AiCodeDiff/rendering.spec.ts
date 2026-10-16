import { expect, test } from '#playwright-tooling/fixtures'

import { buildStoryOptions, TEST_IDS } from './helpers'

test.describe('AiCodeDiff — rendering', () => {
  test('renders size s', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ size: 's' }))

    const root = getByTestId(TEST_IDS.root)
    await expect(root).toBeVisible()
    await expect(root).toHaveAttribute('data-size', 's')
    await expect(getByTestId(TEST_IDS.added)).toHaveText('+83')
    await expect(getByTestId(TEST_IDS.removed)).toHaveText('-26')
  })
})
