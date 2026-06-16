import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils'

import { TEST_IDS } from '../../stories/UploadFiles/testIds'

export { TEST_IDS }

export const UPLOAD_FILES_TEST_ID = TEST_IDS.root

// Скрытый <input type="file"> рендерит @ds/dropzone (TEST_IDS.dropzone.nativeInput).
// Дублируем значение здесь, чтобы не тянуть entry @ds/dropzone (CSS-модули) в playwright-compile.
export const FILE_INPUT_TEST_ID = 'file-input'

// FieldDecorator (@ds/fields) — те же test id, без импорта пакета (CSS-модули в playwright-compile).
export const FIELD_DECORATOR_HINT_TEST_ID = 'field-decorator__hint'
export const FIELD_DECORATOR_COUNTER_TEST_ID = 'field-decorator__counter'

export const UPLOAD_FILES_STORIES = {
  playground: { name: 'uploadfiles', story: 'playground' },
  formatRestricted: { name: 'uploadfiles', story: 'format-restricted' },
  visualMatrix: { name: 'uploadfiles', story: 'visual-matrix' },
  interactionTest: { name: 'uploadfiles-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = UPLOAD_FILES_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: 'uikit-product',
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': UPLOAD_FILES_TEST_ID, ...props },
  }
}
