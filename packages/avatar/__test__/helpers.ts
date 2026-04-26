import { Locator } from '@playwright/test';

import { dataTestIdSelector, StorybookUrlOptions } from '../../../playwright/utils';

export const AVATAR_TEST_ID = 'avatar';

export const TEST_IDS = {
  root: AVATAR_TEST_ID,
  abbreviation: 'abbreviation',
  image: 'image',
  border: 'border',
} as const;

export const AVATAR_STORY_NAME = 'avatar';

export const AVATAR_STORIES = {
  playground: 'playground',
  withImage: 'with-image',
  shapes: 'shapes',
  visualMatrix: 'visual-matrix',
} as const;

export type AvatarStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AvatarStoryProps,
  story: string = AVATAR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: AVATAR_STORY_NAME,
    story,
    props: {
      'data-test-id': AVATAR_TEST_ID,
      ...props,
    },
  };
}

export function getAbbreviation(avatar: Locator): Locator {
  return avatar.locator(dataTestIdSelector(TEST_IDS.abbreviation));
}

export function getImage(avatar: Locator): Locator {
  return avatar.locator(dataTestIdSelector(TEST_IDS.image));
}

export const AVATAR_ROOT_SELECTOR = '#storybook-root';

export const AVATAR_SCREENSHOT_OPTS = {
  animations: 'disabled',
  caret: 'hide',
} as const;

export const AVATAR_STATIC_VISUAL_CASES: ReadonlyArray<{
  story: string;
  name: string;
}> = [
  { story: AVATAR_STORIES.visualMatrix, name: 'avatar-visual-matrix.png' },
  { story: AVATAR_STORIES.withImage, name: 'avatar-with-image.png' },
];

export const AVATAR_EDGE_VISUAL_CASES: ReadonlyArray<{
  name: string;
  props: AvatarStoryProps;
}> = [
  {
    name: 'avatar-two-symbols.png',
    props: { name: 'John Doe', showTwoSymbols: true },
  },
  {
    name: 'avatar-broken-src.png',
    props: { name: 'John Doe', src: 'https://invalid-url.example/broken.jpg' },
  },
];
