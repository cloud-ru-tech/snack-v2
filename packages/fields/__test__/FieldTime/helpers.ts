import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

// Импорт из src/constants, а не entry @ds/fields: entry тянет CSS-modules, ломает playwright-compile.
import { TEST_IDS } from '../../src/constants';
// Story-level id'ы (корни InteractionTest-сцены) + локально продублированный локатор контента
// time-picker'а (@ds/calendar). testIds.ts — leaf-файл без CSS, импорт безопасен для playwright-compile.
import { TEST_IDS as STORY_TEST_IDS, TIME_PICKER_CONTENT_TEST_ID } from '../../stories/FieldTime/testIds';

export { STORY_TEST_IDS, TEST_IDS, TIME_PICKER_CONTENT_TEST_ID };

/** Title `Components/Fields/FieldTime[/Tests/<Scenario>]` → kebab-cased storybook id. */
export const FIELD_TIME_STORIES = {
  playground: { name: 'fields-fieldtime', story: 'playground' },
  visualMatrix: { name: 'fields-fieldtime', story: 'visual-matrix' },
  interactionTest: { name: 'fields-fieldtime-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_TIME_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.fieldTime, ...props },
  };
}
