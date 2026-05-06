import { StorybookUrlOptions } from '#playwright-tooling/utils';

export const BUTTON_GROUP_TEST_ID = 'button-group';
export const BUTTON_GROUP_PRIMARY_TEST_ID = 'button-group-primary';
export const BUTTON_GROUP_SECONDARY_TEST_ID = 'button-group-secondary';
export const BUTTON_GROUP_TERTIARY_TEST_ID = 'button-group-tertiary';

export const BUTTON_GROUP_PACKAGE_NAME = 'button';
export const BUTTON_GROUP_STORY_NAME = 'buttongroup';

export const BUTTON_GROUP_STORIES = {
  playground: 'playground',
  /** `PlaygroundPrimaryDisabled` — nested action objects from URL are unreliable on static iframe. */
  playgroundPrimaryDisabled: 'playground-primary-disabled',
  /** `PlaygroundCriticalPrimary` — baked args for the same assertions as former URL-only overrides. */
  playgroundCriticalPrimary: 'playground-critical-primary',
  twoActions: 'two-actions',
  threeActions: 'three-actions',
  visualMatrix: 'visual-matrix',
} as const;

export type ButtonGroupStoryProps = Record<string, unknown>;

const DEFAULT_PRIMARY = {
  label: 'Сохранить',
  appearance: 'primary',
  view: 'filled',
  'data-test-id': BUTTON_GROUP_PRIMARY_TEST_ID,
};
const DEFAULT_SECONDARY = {
  label: 'Отмена',
  appearance: 'neutral',
  view: 'outline',
  'data-test-id': BUTTON_GROUP_SECONDARY_TEST_ID,
};

export function buildButtonGroupStoryOptions(
  props?: ButtonGroupStoryProps,
  story: string = BUTTON_GROUP_STORIES.playground,
): StorybookUrlOptions {
  const base: Record<string, unknown> = {
    'data-test-id': BUTTON_GROUP_TEST_ID,
    primaryAction: DEFAULT_PRIMARY,
    secondaryAction: DEFAULT_SECONDARY,
  };
  return {
    name: BUTTON_GROUP_STORY_NAME,
    group: BUTTON_GROUP_PACKAGE_NAME,
    story,
    props: { ...base, ...props },
  };
}

export const BUTTON_GROUP_ROOT_SELECTOR = '#storybook-root';

export const BUTTON_GROUP_SCREENSHOT_OPTS = {
  animations: 'disabled',
  caret: 'hide',
} as const;

export const BUTTON_GROUP_A11Y_CASES: ReadonlyArray<{
  story: string;
  label: string;
}> = [
  { story: BUTTON_GROUP_STORIES.playground, label: 'playground' },
  { story: BUTTON_GROUP_STORIES.threeActions, label: 'three-actions' },
];
