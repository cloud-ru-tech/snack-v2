import { expect, test } from '#playwright-tooling/fixtures'

import { buildStoryOptions, FILE_INPUT_TEST_ID, TEST_IDS, UPLOAD_FILES_STORIES } from './helpers'

// Реальный native <input type="file"> через setInputFiles недоступен в Storybook play
// (synthetic env). Здесь — единственная точка проверки полного file-picker pipeline:
// выбор файла → валидация → рендер вложения.
test.describe('UploadFiles — interaction (browser-specific)', () => {
  test('accepts a valid file and renders an attachment', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions())
    const input = getByTestId(FILE_INPUT_TEST_ID)
    await input.setInputFiles({ name: 'report.pdf', mimeType: 'application/pdf', buffer: Buffer.from('pdf') })

    const filesCount = await input.evaluate(el => (el as HTMLInputElement).files?.length ?? 0)
    expect(filesCount).toBe(1)

    const attachment = getByTestId(TEST_IDS.attachment).first()
    await expect(attachment).toBeVisible()
    await expect(attachment).not.toHaveAttribute('data-attachment-error', 'true')
  })

  test('rejects an unsupported format with an error attachment', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, UPLOAD_FILES_STORIES.formatRestricted))
    const input = getByTestId(FILE_INPUT_TEST_ID)
    await input.setInputFiles({ name: 'photo.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('jpg') })

    await expect(getByTestId(TEST_IDS.attachment).first()).toHaveAttribute('data-attachment-error', 'true')
  })

  test('rejects an oversized file with an error attachment', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ maxSize: 4 }))
    const input = getByTestId(FILE_INPUT_TEST_ID)
    await input.setInputFiles({ name: 'big.pdf', mimeType: 'application/pdf', buffer: Buffer.from('oversized') })

    await expect(getByTestId(TEST_IDS.attachment).first()).toHaveAttribute('data-attachment-error', 'true')
  })
})
