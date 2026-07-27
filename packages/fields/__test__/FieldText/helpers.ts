import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

// Импорт из src/constants, а не entry @ds/fields: entry тянет CSS-modules, ломает playwright-compile.
import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

/** Title `Components/Fields/FieldText` → kebab-cased storybook id. */
export const FIELD_TEXT_STORIES = {
  playground: { name: 'fields-fieldtext', story: 'playground' },
  visualMatrix: { name: 'fields-fieldtext', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_TEXT_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.fieldText, ...props },
  };
}
