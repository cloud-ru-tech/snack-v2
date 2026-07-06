import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'fieldspredefined';

export const FIELD_SELECT_CREATE_STORIES = {
  playground: { name: 'fieldselectcreate', story: 'playground' },
  visualMatrix: { name: 'fieldselectcreate', story: 'visual-matrix' },
  interactionTest: { name: 'fieldselectcreate-tests-interaction', story: 'interaction-test' },
  createModal: { name: 'fieldselectcreate-examples-createmodal', story: 'create-modal' },
} as const satisfies Record<string, StoryRef>;

// FieldSelectCreate сам проставляет `data-test-id` на корневой `<div>`
// (TEST_IDS.fieldSelectCreate). Передавать его повторно через URL-args нельзя —
// он осядет и на вложенном FieldSelect через `{...rest}` и даст дубль (strict-mode
// violation). Поэтому buildStoryOptions для этого пакета НЕ инжектит data-test-id.
export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_SELECT_CREATE_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: CATEGORY,
    group: GROUP,
    name: ref.name,
    story: ref.story,
    props,
  };
}
