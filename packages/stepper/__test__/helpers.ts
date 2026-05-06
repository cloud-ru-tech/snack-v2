import { StorybookUrlOptions } from '../../../playwright/utils';

export const STEPPER_TEST_ID = 'stepper';
export const STEPPER_NEXT_TEST_ID = 'stepper-next';
export const STEPPER_PREV_TEST_ID = 'stepper-prev';

export const STEPPER_STORY_NAME = 'stepper';

export const STEPPER_STORIES = {
  playground: 'playground',
  basicFlow: 'basic-flow',
  withValidator: 'with-validator',
  completed: 'completed',
  mobile: 'mobile',
  adaptive: 'adaptive',
  interactionTest: 'interaction-test',
  visualMatrix: 'visual-matrix',
} as const;

export type StepperStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: StepperStoryProps,
  story: string = STEPPER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: STEPPER_STORY_NAME,
    story,
    props: {
      'data-test-id': STEPPER_TEST_ID,
      ...props,
    },
  };
}

export const STEPPER_ROOT_SELECTOR = '#storybook-root';

export const STEPPER_SCREENSHOT_OPTS = {
  animations: 'disabled',
  caret: 'hide',
} as const;

export const STEPPER_A11Y_CASES: ReadonlyArray<{
  story: string;
  label: string;
  props?: StepperStoryProps;
}> = [
  { story: STEPPER_STORIES.playground, label: 'playground' },
  { story: STEPPER_STORIES.basicFlow, label: 'basic-flow' },
  { story: STEPPER_STORIES.completed, label: 'completed' },
];

export const STEPPER_STATIC_VISUAL_CASES: ReadonlyArray<{ story: string; name: string }> = [
  { story: STEPPER_STORIES.visualMatrix, name: 'stepper-visual-matrix.png' },
  { story: STEPPER_STORIES.basicFlow, name: 'stepper-basic-flow.png' },
  { story: STEPPER_STORIES.mobile, name: 'stepper-mobile.png' },
];
