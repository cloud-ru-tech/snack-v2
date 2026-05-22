import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const AVATAR_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type AvatarStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AvatarStoryProps,
  story: string = AVATAR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'avatar',
    story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
