import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { SIZE } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export const CHIPS_GROUP = 'chips' as const;

export type ChipStoryProps = Record<string, unknown>;

export const KEY_SIZES = Object.values(SIZE);

function build(name: string, story: string, testId: string, props?: ChipStoryProps): StorybookUrlOptions {
  return {
    name,
    group: CHIPS_GROUP,
    story,
    props: {
      'data-test-id': testId,
      ...props,
    },
  };
}

export function buildChipAssistStory(props?: ChipStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('chipassist', story, TEST_IDS.chipAssist.root, props);
}

export function buildChipToggleStory(props?: ChipStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('chiptoggle', story, TEST_IDS.chipToggle.root, props);
}

export function buildChipChoiceStory(props?: ChipStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('chipchoice', story, TEST_IDS.chipChoice.root, props);
}

export function buildChipChoiceVariantStory(
  variant: 'custom' | 'date' | 'daterange' | 'multiple' | 'single' | 'time',
  props?: ChipStoryProps,
  story = 'playground',
): StorybookUrlOptions {
  return build(`chipchoice-${variant}`, story, TEST_IDS.chipChoice.root, props);
}

export function buildChipChoiceRowStory(props?: ChipStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('chipchoicerow', story, TEST_IDS.chipChoiceRow.root, props);
}

export const CHIP_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;
