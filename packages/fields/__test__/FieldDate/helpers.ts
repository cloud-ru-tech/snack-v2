import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

// Импорт из src/constants, а не entry @ds/fields: entry тянет CSS-modules, ломает playwright-compile.
import { TEST_IDS } from '../../src/constants';
// Story-level id'ы (корни InteractionTest-сцены) + локально продублированные локаторы выпадающего
// календаря @ds/calendar. testIds.ts — leaf-файл без CSS, импорт безопасен для playwright-compile.
import {
  CALENDAR_DROPDOWN_CONTENT_TEST_ID,
  CALENDAR_ITEM_TEST_ID,
  TEST_IDS as STORY_TEST_IDS,
} from '../../stories/FieldDate/testIds';

export { CALENDAR_DROPDOWN_CONTENT_TEST_ID, CALENDAR_ITEM_TEST_ID, STORY_TEST_IDS, TEST_IDS };

/** Title `Components/Fields/FieldDate[/Tests/<Scenario>]` → kebab-cased storybook id. */
export const FIELD_DATE_STORIES = {
  playground: { name: 'fields-fielddate', story: 'playground' },
  visualMatrix: { name: 'fields-fielddate', story: 'visual-matrix' },
  interactionTest: { name: 'fields-fielddate-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_DATE_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.fieldDate, ...props },
    globals,
  };
}
