import { StorybookUrlOptions } from '../../../playwright/utils';
import { VIEW } from '../src/Button/constants';

export const BUTTON_TEST_ID = 'button';

export const BUTTON_STORY_NAME = 'button';

export const BUTTON_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  iconOnly: 'icon-only',
  loadingState: 'loading-state',
  disabledState: 'disabled-state',
  linkButton: 'link-button',
} as const;

export type ButtonStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: ButtonStoryProps,
  story: string = BUTTON_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: BUTTON_STORY_NAME,
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

// Figma-specified heights per size (from figma-integration.md)
export const BUTTON_HEIGHT_BY_SIZE = {
  s: 24,
  m: 32,
  l: 40,
} as const;

export const BUTTON_STATIC_VISUAL_CASES: ReadonlyArray<{
  story: string;
  name: string;
}> = [{ story: BUTTON_STORIES.visualMatrix, name: 'button-visual-matrix.png' }];

export const BUTTON_A11Y_CASES: ReadonlyArray<{
  story: string;
  label: string;
}> = [
  { story: BUTTON_STORIES.playground, label: 'playground' },
  { story: BUTTON_STORIES.iconOnly, label: 'icon-only' },
  { story: BUTTON_STORIES.disabledState, label: 'disabled' },
  { story: BUTTON_STORIES.linkButton, label: 'as-anchor' },
];

export const BUTTON_INTERACTION_VISUAL_CASES: ReadonlyArray<{
  name: string;
  action: 'none' | 'hover' | 'focus' | 'pressed';
}> = [
  { name: 'button-default.png', action: 'none' },
  { name: 'button-hover.png', action: 'hover' },
  { name: 'button-focus.png', action: 'focus' },
  { name: 'button-pressed.png', action: 'pressed' },
];

export const BUTTON_STATE_VISUAL_CASES: ReadonlyArray<{
  name: string;
  props: ButtonStoryProps;
}> = [
  { name: 'button-disabled.png', props: { disabled: true } },
  { name: 'button-loading.png', props: { loading: true } },
];

export const KEY_VIEWS = Object.values(VIEW);

export const RESPONSIVE_VIEWPORTS = [
  { width: 375, height: 812, name: '375' },
  { width: 768, height: 1024, name: '768' },
  { width: 1440, height: 900, name: '1440' },
] as const;
