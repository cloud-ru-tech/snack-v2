import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS as STORY_TEST_IDS } from '../../stories/testIds';

export const TEST_IDS = STORY_TEST_IDS.kbdShortcut;

export const KBD_SHORTCUT_CATEGORY = 'uikit-product';
export const KBD_SHORTCUT_GROUP = 'kbd';
export const KBD_SHORTCUT_STORY_NAME = 'kbdshortcut';

export const KBD_SHORTCUT_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type KbdShortcutStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: KbdShortcutStoryProps,
  story: string = KBD_SHORTCUT_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: KBD_SHORTCUT_STORY_NAME,
    group: KBD_SHORTCUT_GROUP,
    category: KBD_SHORTCUT_CATEGORY,
    story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
