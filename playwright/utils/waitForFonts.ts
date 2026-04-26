import { Page } from '@playwright/test'

/**
 * Block until web fonts are fully loaded. Required before any
 * visual regression snapshot to avoid FOUT-induced diffs.
 */
export async function waitForFonts(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await document.fonts.ready
  })
}
