import AxeBuilder from '@axe-core/playwright'

import { expect, test } from '../../../playwright/fixtures'

const STORY = 'components-{{COMPONENT_KEBAB}}'

test.describe('{{DISPLAY_TITLE}} — rendering', () => {
  test('default renders and is visible', async ({ page, gotoStory }) => {
    await gotoStory(`${STORY}--default`)
    await expect(page.getByText('{{DISPLAY_TITLE}}')).toBeVisible()
  })

  test('outlined renders', async ({ page, gotoStory }) => {
    await gotoStory(`${STORY}--outlined`)
    await expect(page.getByText('{{DISPLAY_TITLE}}')).toBeVisible()
  })
})

test.describe('{{DISPLAY_TITLE}} — accessibility', () => {
  test('no axe violations — default', async ({ page, gotoStory }) => {
    await gotoStory(`${STORY}--default`)
    const results = await new AxeBuilder({ page }).include('#storybook-root').analyze()
    expect(results.violations).toEqual([])
  })
})
