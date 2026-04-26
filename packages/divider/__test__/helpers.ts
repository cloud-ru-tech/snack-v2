import { StorybookUrlOptions } from '../../../playwright/utils';

export const DIVIDER_TEST_ID = 'divider';

export const DIVIDER_STORY_NAME = 'divider';

export const DIVIDER_STORIES = {
  playground: 'playground',
  withThinVariant: 'with-thin-variant',
  withVerticalOrientation: 'with-vertical-orientation',
  visualMatrix: 'visual-matrix',
} as const;

export type DividerStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: DividerStoryProps,
  story: string = DIVIDER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: DIVIDER_STORY_NAME,
    story,
    props: {
      'data-test-id': DIVIDER_TEST_ID,
      ...props,
    },
  };
}

export const DIVIDER_ROOT_SELECTOR = '#storybook-root';

export const DIVIDER_SCREENSHOT_OPTS = {
  animations: 'disabled',
  caret: 'hide',
} as const;

export const DIVIDER_STATIC_VISUAL_CASES: ReadonlyArray<{
  story: string;
  name: string;
}> = [
  { story: DIVIDER_STORIES.visualMatrix, name: 'divider-visual-matrix.png' },
  { story: DIVIDER_STORIES.withThinVariant, name: 'divider-thin.png' },
  { story: DIVIDER_STORIES.withVerticalOrientation, name: 'divider-vertical.png' },
];
