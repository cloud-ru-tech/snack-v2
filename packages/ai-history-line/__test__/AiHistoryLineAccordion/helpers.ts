import { StorybookUrlOptions } from '#playwright-tooling/utils';

type StoryRef = { name: string; story: string; group?: string };

export const AI_HISTORY_LINE_ACCORDION_STORIES = {
  visualMatrix: { name: 'aihistorylineaccordion', story: 'visual-matrix', group: 'aihistoryline' },
  controlled: { name: 'aihistorylineaccordion', story: 'controlled', group: 'aihistoryline' },
} as const satisfies Record<string, StoryRef>;

export const FORCE_OPEN_TEST_ID = 'ai-history-line-accordion-force-open';

export function buildStoryOptions(ref: StoryRef = AI_HISTORY_LINE_ACCORDION_STORIES.visualMatrix): StorybookUrlOptions {
  return { name: ref.name, group: ref.group, story: ref.story };
}
