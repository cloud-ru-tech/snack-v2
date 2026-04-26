import { StorybookUrlOptions } from '../../../../playwright/utils';
import { VIEW } from '../../src/Button/constants';

export const BUTTON_TEST_ID = 'button';

/** Title `Components/Button/Button` → story id prefix `components-button-button` (SB 10). */
export const BUTTON_GROUP_NAME = 'button';
export const BUTTON_STORY_NAME = 'button';

export const BUTTON_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  linkButton: 'link-button',
  fullWidth: 'full-width',
} as const;

export type ButtonStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: ButtonStoryProps,
  story: string = BUTTON_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: BUTTON_STORY_NAME,
    group: BUTTON_GROUP_NAME,
    story,
    props: {
      'data-test-id': BUTTON_TEST_ID,
      ...props,
    },
  };
}

export const BUTTON_ROOT_SELECTOR = '#storybook-root';

export const BUTTON_SCREENSHOT_OPTS = {
  animations: 'disabled',
  caret: 'hide',
} as const;

export const BUTTON_A11Y_CASES: ReadonlyArray<{
  story: string;
  label: string;
  props?: ButtonStoryProps;
}> = [
  { story: BUTTON_STORIES.playground, label: 'playground' },
  { story: BUTTON_STORIES.playground, label: 'disabled', props: { disabled: true } },
  { story: BUTTON_STORIES.linkButton, label: 'as-anchor' },
];

export const BUTTON_INTERACTION_VISUAL_CASES: ReadonlyArray<{
  name: string;
  action: 'none' | 'hover' | 'focus' | 'pressed';
}> = [
  { name: 'default.png', action: 'none' },
  { name: 'hover.png', action: 'hover' },
  { name: 'focus.png', action: 'focus' },
  { name: 'pressed.png', action: 'pressed' },
];

export const KEY_VIEWS = Object.values(VIEW);
