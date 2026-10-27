import { StorybookUrlOptions } from '#playwright-tooling/utils';

type StoryRef = { name: string; story: string; group?: string };

export const AI_HISTORY_LINE_STEPPER_STORIES = {
  visualMatrix: { name: 'aihistorylinestepper', story: 'visual-matrix', group: 'aihistoryline' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(ref: StoryRef = AI_HISTORY_LINE_STEPPER_STORIES.visualMatrix): StorybookUrlOptions {
  return { name: ref.name, group: ref.group, story: ref.story };
}
