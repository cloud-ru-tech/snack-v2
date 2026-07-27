import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

// Импорт из src/constants, а не entry @ds/fields: entry тянет CSS-modules, ломает playwright-compile.
import { TEST_IDS } from '../../src/constants';
// Story-level id'ы (droplist-сцена, корни InteractionTest / keyboard-сцены) — единый источник
// со stories. testIds.ts — leaf-файл без CSS, импорт безопасен для playwright-compile.
import { CLEAR_BUTTON_TEST_ID, TEST_IDS as STORY_TEST_IDS } from '../../stories/FieldCombo/testIds';

export { CLEAR_BUTTON_TEST_ID, STORY_TEST_IDS, TEST_IDS };

/** Title `Components/Fields/FieldCombo[/Tests|Examples/<Scenario>]` → kebab-cased storybook id. */
export const FIELD_COMBO_STORIES = {
  playground: { name: 'fields-fieldcombo', story: 'playground' },
  visualMatrix: { name: 'fields-fieldcombo', story: 'visual-matrix' },
  interactionTest: { name: 'fields-fieldcombo-tests-interaction', story: 'interaction-test' },
  rovingScene: { name: 'fields-fieldcombo-tests-rovingnavscene', story: 'roving-nav-scene' },
  elementButtonStates: { name: 'fields-fieldcombo-tests-elementbuttonstates', story: 'element-button-states' },
  withDroplist: { name: 'fields-fieldcombo-examples-withdroplist', story: 'with-droplist' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_COMBO_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.fieldCombo, ...props },
  };
}
