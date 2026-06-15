import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

// Импорт из src/constants, а не entry @ds/fields: entry тянет CSS-modules, ломает playwright-compile.
import { TEST_IDS } from '../../src/constants';
// Story-level id'ы (корни InteractionTest / AsyncReveal / keyboard-сцены) — единый источник
// со stories. testIds.ts — leaf-файл без CSS, импорт безопасен для playwright-compile.
import { TEST_IDS as STORY_TEST_IDS } from '../../stories/FieldSecure/testIds';

export { STORY_TEST_IDS, TEST_IDS };

/** Title `Components/Fields/FieldSecure[/Tests/<Scenario>]` → kebab-cased storybook id. */
export const FIELD_SECURE_STORIES = {
  playground: { name: 'fields-fieldsecure', story: 'playground' },
  visualMatrix: { name: 'fields-fieldsecure', story: 'visual-matrix' },
  interactionTest: { name: 'fields-fieldsecure-tests-interaction', story: 'interaction-test' },
  asyncReveal: { name: 'fields-fieldsecure-tests-asyncreveal', story: 'async-reveal' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_SECURE_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.fieldSecure, ...props },
  };
}
