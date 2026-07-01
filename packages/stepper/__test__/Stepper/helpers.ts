import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/Stepper/testIds';

export { TEST_IDS };

export const STEPPER_STORIES = {
  playground: { name: 'stepper', story: 'playground' },
  visualMatrix: { name: 'stepper', story: 'visual-matrix' },
  // Storybook 10 kebab-case'ит PascalCase-имя как одну группу: `BasicFlow` → `basicflow`,
  // `WithValidator` → `withvalidator` (НЕ `basic-flow`/`with-validator`). Story-часть id
  // же — `basic-flow` (от export name). Проверяй реальные id в `http://localhost:6006/index.json`.
  basicFlow: { name: 'stepper-examples-basicflow', story: 'basic-flow' },
  withValidator: { name: 'stepper-examples-withvalidator', story: 'with-validator' },
  mobile: { name: 'stepper-examples-mobile', story: 'mobile' },
  adaptive: { name: 'stepper-examples-adaptive', story: 'adaptive' },
  interactionTest: { name: 'stepper-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export type StepperStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: StepperStoryProps,
  ref: StoryRef = STEPPER_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
    globals,
  };
}
