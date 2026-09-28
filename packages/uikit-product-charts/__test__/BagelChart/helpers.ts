import { TEST_IDS } from '../../stories/testIds';
import { createBuildStoryOptions } from '../storybookHelpers';

export { TEST_IDS };

export const BAGEL_CHART_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

const buildStoryOptionsBase = createBuildStoryOptions({
  category: 'uikit-product',
  group: 'charts',
  storyName: 'bagelchart',
  testId: TEST_IDS.bagelChart.root,
});

export function buildStoryOptions(props?: Record<string, unknown>, story: string = BAGEL_CHART_STORIES.playground) {
  return buildStoryOptionsBase(props ?? {}, story);
}

export function buildTestStoryOptions(name: string, story: string, props?: Record<string, unknown>) {
  return { ...buildStoryOptionsBase(props ?? {}, story), name };
}
