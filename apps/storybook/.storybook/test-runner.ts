import AxeBuilder from '@axe-core/playwright'
import { getStoryContext, type TestRunnerConfig } from '@storybook/test-runner'

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    // Run axe on every story automatically
    const storyContext = await getStoryContext(page, context)

    // Skip accessibility check if story opts out: tags: ['no-a11y']
    if (storyContext.tags?.includes('no-a11y')) return

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .analyze()

    if (results.violations.length > 0) {
      const formatted = results.violations
        .map((v) => `[${v.impact}] ${v.id}: ${v.description}`)
        .join('\n')
      throw new Error(`Axe violations found:\n${formatted}`)
    }
  },
}

export default config
