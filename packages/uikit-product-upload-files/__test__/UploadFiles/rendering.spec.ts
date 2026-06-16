import { expect, test } from '#playwright-tooling/fixtures'

import {
  buildStoryOptions,
  FIELD_DECORATOR_COUNTER_TEST_ID,
  FIELD_DECORATOR_HINT_TEST_ID,
  TEST_IDS,
  UPLOAD_FILES_STORIES,
} from './helpers'

test.describe('UploadFiles — rendering', () => {
  test('renders root and dropzone', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions())
    await expect(getByTestId(TEST_IDS.root)).toBeVisible()
    await expect(getByTestId(TEST_IDS.dropzone)).toBeVisible()
  })

  test('renders attachments for uploaded files', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, UPLOAD_FILES_STORIES.visualMatrix))
    await expect(getByTestId(TEST_IDS.attachment).first()).toBeVisible()
  })

  test('renders summary error and counter when over the file limit', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, UPLOAD_FILES_STORIES.visualMatrix))
    await expect(getByTestId(FIELD_DECORATOR_HINT_TEST_ID).first()).toBeVisible()
    await expect(getByTestId(FIELD_DECORATOR_COUNTER_TEST_ID).first()).toBeVisible()
  })
})
